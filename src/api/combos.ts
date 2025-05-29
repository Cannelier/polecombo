import { getComboWithSignedUrls, toComboWithMoves } from '@/src/domain/combo/helpers';
import { PrismaClient } from '@prisma/client';
import { Hono } from "hono";
import { z } from 'zod';

const prisma = new PrismaClient()

const combos = new Hono()


export const CombosPatchAddMoveSchema = z.object({
    moveId: z.number()
})

export type CombosPatchAddMoveVariables = z.infer<typeof CombosPatchAddMoveSchema>

export interface MoveFromComboQueryResponse {
    moveId: number,
    rank: number,
    name: string,
    imageUrl?: string,
}

export interface ComboQueryResponse {
    comboId: number,
    name: string,
    movesInCombo: MoveFromComboQueryResponse[]
}

combos.get("/", async (c) => {
    const data = await prisma.combo.findMany({
        include: {
            movesInCombo: { include: {
                move: { select: {
                    id: true,
                    imageUrl: true,
                }}
            }}
        }
    })
    // Get signed image URL
    const combosWithSignedUrl = await Promise.all(
        data.map(async (combo) => getComboWithSignedUrls(combo))
    )
    return c.json(combosWithSignedUrl)
})

combos.get("/:comboId", async (c) => {
    const comboId = Number(c.req.param('comboId'))
    const data = await prisma.combo.findUnique({
        where: {
            id: comboId
        },
        include: {
            movesInCombo: { include: {
                move: { select: {
                    name: true,
                    imageUrl: true,
                    codeNo: true,
                }},
            },
            orderBy: { rank: "asc" }}
        }
    })

    if (!data) {
        throw new Error(`Combo with id ${comboId} not found`);
    }
    const comboWithMoves = await toComboWithMoves(data);
    return c.json(comboWithMoves);
})

combos.put("/:comboId", async (c) => {
    const comboId = Number(c.req.param("comboId"));
    const updatedCombo = await c.req.json();
    const newMovesInCombo = updatedCombo.movesInCombo.map((moveFromComboResponse: MoveFromComboQueryResponse, index) => (
        { comboId: comboId,
          moveId: moveFromComboResponse.moveId,
          rank: index,
        }
    ));

    const combo = await prisma.$transaction(async (transaction) => {
        // Delete existing moves for combo
        await transaction.comboMove.deleteMany({
            where: { comboId: comboId }
        });

        // Insert new moves
        await transaction.comboMove.createMany({
            data: newMovesInCombo
        })

        return transaction.combo.findUnique({
            where: { id: comboId },
            include: {
                movesInCombo: {
                    include: {
                        move: {
                            select: {
                                name: true,
                                imageUrl: true,
                                codeNo: true
                            }
            }}}}})
    })
    return c.json({ combo }, 200)
})

combos.patch("/:comboId", async (c) => {
    // TODO: Add check combo can be accessed by user
    const comboId = Number(c.req.param("comboId"))
    const payload = await c.req.json()
    const safePayload = CombosPatchAddMoveSchema.safeParse(payload)
    const { moveId } = payload
    
    if (!safePayload.success) {
        console.error(safePayload.error)
        throw new Error(`Invalid data passed to create move in combo ${comboId}`)
    }
    const combo = await prisma.combo.findUnique({
        where: { id: comboId },
        include: {
            movesInCombo: true
        }
    })
    
    const newRank = combo?.movesInCombo.length || 0;
    
    console.log(`In combo ID ${comboId} adding move ID ${moveId} at position ${newRank}`)
    
    if (combo?.movesInCombo.every((moveInCombo) => (moveInCombo.rank !== newRank))) {
        const newComboMoveId = await prisma.comboMove.create({
            data: {
                comboId: comboId,
                moveId: moveId,
                rank: newRank,
            }
        })
        return c.json({ newComboMoveId }, 200)

    } else {
        throw new Error("Already a move with this rank. Can't save new move.")
    }
})

export default combos
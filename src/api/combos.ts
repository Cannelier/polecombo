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
    imageUrl: string,
    codeNo: string,
}

export interface ComboQueryResponse {
    comboId: number,
    name: string,
    movesInCombo: MoveFromComboQueryResponse[]
}

combos.get("/", async (c) => {
    const data = await prisma.combo.findMany()
    return c.json(data);
})

combos.get("/:comboId", async (c) => {
    const comboId = Number(c.req.param('comboId'))

    function toComboWithMoves(combo):  ComboQueryResponse  {
        return { 
            comboId: combo.id,
            name: combo.name,
            movesInCombo: combo.movesInCombo.map((mic) => ({
                moveId: mic.moveId,
                rank: mic.rank,
                name: mic.move.name,
                imageUrl: mic.move.imageUrl,
                codeNo: mic.move.codeNo
        }))}
    }

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
    const comboWithMoves = toComboWithMoves(data);
    return c.json(comboWithMoves);
})

combos.put("/:comboId", async (c) => {
    const comboId = Number(c.req.param("comboId"));
    const updatedCombo = await c.req.json();
    const movesInCombo = updatedCombo.movesInCombo.map((moveFromComboResponse: MoveFromComboQueryResponse) => (
        { comboId: comboId,
          moveId: moveFromComboResponse.moveId,
          rank: moveFromComboResponse.rank,
        }
    ))
    await Promise.all(
    movesInCombo.map(
        async (moveInCombo: { comboId: number, moveId: number, rank: number}) => {
            prisma.comboMove.update({
                where: {
                    comboId_moveId: {
                        comboId: moveInCombo.comboId,
                        moveId: moveInCombo.moveId
                    },
                },
                data: {
                    rank: moveInCombo.rank,
                }
            })
        })
    )
    const combo = await prisma.combo.findUnique({
        where: {
            id: comboId,
        }
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
import { PrismaClient } from '@prisma/client';
import { Hono } from "hono";

const prisma = new PrismaClient()

const combos = new Hono()

combos.get("/", async (c) => {
    const data = await prisma.combo.findMany()
    return c.json(data);
})


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

export default combos
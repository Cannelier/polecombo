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
    image_url: string,
}

export interface ComboQueryResponse {
    comboId: number,
    name: string,
    moves: MoveFromComboQueryResponse[]
}

combos.get("/:comboId", async (c) => {
    const comboId = Number(c.req.param('comboId'))

    function toComboWithMoves(combo):  ComboQueryResponse  {
        return { 
            comboId: combo.id,
            name: combo.name,
            moves: combo.movesInCombo.map((mic) => ({
                moveId: mic.moveId,
                rank: mic.rank,
                name: mic.move.name,
                image_url: mic.move.image_url,
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
                    image_url: true,
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

export default combos
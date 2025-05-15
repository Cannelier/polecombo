import { PrismaClient } from '@prisma/client';
import { Hono } from "hono";

const prisma = new PrismaClient()

const combos = new Hono()

combos.get("/", async (c) => {
    const data = await prisma.combo.findMany({
        include: {
            movesInCombo: {
                include: { move: true },
                orderBy: { rank: "asc"}
            }
        }
    })
    return c.json(data);
})

export default combos
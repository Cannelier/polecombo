import { PrismaClient } from '@prisma/client';
import { Hono } from "hono";

const prisma = new PrismaClient()

const combos = new Hono()

combos.get("/", async (c) => {
    const data = await prisma.combo.findMany()
    return c.json(data);
})

export default combos
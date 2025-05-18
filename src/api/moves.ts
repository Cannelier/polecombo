import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const prisma = new PrismaClient();
const moves = new Hono();

moves.get('/', async (c) => {
    const allMoves = await prisma.move.findMany();
    return c.json(allMoves)
})

export default moves;
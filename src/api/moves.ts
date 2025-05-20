import { MoveModel } from "@/prisma/zod/move";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { z } from "zod";

const prisma = new PrismaClient();
const moves = new Hono();


export const MoveSchema = MoveModel
export type MoveData = z.infer<typeof MoveSchema>
export const MovesSchema = z.array(MoveSchema)
export type MovesData = z.infer<typeof MovesSchema>

moves.get('/', async (c) => {
    const allMoves = await prisma.move.findMany();
    return c.json(allMoves)
})

export default moves;
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


moves.post('/', async (c) => {
    console.log("On essaie de creer le move")
    // Add custom user and image
    const { moveName } = await c.req.json();
    const customMove = await prisma.move.create({
        data: {
            name: moveName
        }
    })

    console.log("✅ Move créé")
  return c.json(customMove);
})


export default moves;
import { MoveModel } from "@/prisma/zod/move";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { z } from "zod";
import { getMoveWithSignedUrl } from "../domain/move/helpers";


const prisma = new PrismaClient();
const moves = new Hono();


export const MoveSchema = MoveModel
export type MoveData = z.infer<typeof MoveSchema>
export const MovesSchema = z.array(MoveSchema)
export type MovesData = z.infer<typeof MovesSchema>

moves.get('/', async (c) => {
    const allMoves = await prisma.move.findMany();
    const allMovesWithSignedUrl = await Promise.all(allMoves.map(async(move) => await getMoveWithSignedUrl(move)))
    return c.json(allMovesWithSignedUrl)
})


moves.get('/filter', async (c) => {
    const searchQuery = c.req.query('searchQuery');
    if (!searchQuery) {
        return c.json([])
    }

    const filteredMoves = await prisma.move.findMany({
        where: {
            name: {
                contains: searchQuery, // use 'contains' for partial matches
                mode: 'insensitive',   // optional: case-insensitive searc
            }
        }
    });
    const filteredMovesWithSignedUrl = await Promise.all(filteredMoves.map(async(move) => await getMoveWithSignedUrl(move)))
    return c.json(filteredMovesWithSignedUrl)
})

moves.post('/', async (c) => {
    // Add custom user and image
    const { moveName } = await c.req.json();
    const moveWithSameName = await prisma.move.findFirst({
        where: {
            name: moveName
        }
    })
    if (moveWithSameName) {
        console.log("❌ Move with the same name already exists")
        return c.json({ moveId: moveWithSameName.id }, 400)
    }
    const customMove = await prisma.move.create({
        data: {
            name: moveName
        }
    })

  return c.json(customMove);
})


export default moves;
import { MoveModel } from "@/prisma/zod/move";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { z } from "zod";
import { getMoveWithSignedUrl } from "../domain/move/helpers";
import { supabase } from "../services/supabaseClient";

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

moves.post('/custom', async (c) => {
    // Add a custom move from user
    const formData = await c.req.formData();
    const moveName = formData.get('moveName') as string;
    const image = formData.get('file') as File | null;
    const imageUrl = image ?
        await uploadCustomMoveImage(image, moveName).then((self) => self?.path)
        : null

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
            name: moveName,
            imageUrl: imageUrl ?? null,
        }
    })
    const customMoveWithPresignedUrl = await getMoveWithSignedUrl(customMove)
    return c.json(customMoveWithPresignedUrl);
})

async function uploadCustomMoveImage(image: File, moveName: string) {
    const CUSTOM_MOVES_FOLDER = "images/customMoves"
    const timestamp = new Date().toISOString();
    const safeTimestamp = timestamp.replace(/[:.]/g, '-');

    const fileName = `${CUSTOM_MOVES_FOLDER}/${moveName}-${safeTimestamp}.png`
    const { data: imageData, error } = await supabase.storage
            .from('staging')
            .upload(fileName, image.stream(), {
                contentType: "image/png",
                upsert: false,
            })
        
        if (error) {
            console.error("❌ Could not upload custom move image")
        }
        return imageData
}

export default moves;
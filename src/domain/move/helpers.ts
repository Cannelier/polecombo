import { supabase } from "@/src/services/supabaseClient";
import { Move } from "@prisma/client";

const env = process.env.ENV!

export async function getMoveWithSignedUrl(move: Move) {
    const imagePath = move.imageUrl ?? 'images/moves/undefined.png';
    const { data, error } = await supabase
        .storage
        .from(env)
    .createSignedUrl(imagePath, 60)

    return { ...move,
        imageUrl: data?.signedUrl
    }
}

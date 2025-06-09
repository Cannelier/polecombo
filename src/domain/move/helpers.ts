import { CompleteMove } from "@/prisma/zod/move";
import { MoveForCombosScreen } from "@/shared/types/combo";
import { UNDEFINED_MOVE_IMAGE_URL } from "@/src/config/constants";
import { supabase } from "@/src/services/supabaseServer";

const env = process.env.ENV!

export async function getMoveWithSignedUrl(move: MoveForCombosScreen | CompleteMove): Promise<MoveForCombosScreen> {
    const imagePath = move.imageUrl ?? UNDEFINED_MOVE_IMAGE_URL;
    const { data: moveImageData, error } = await supabase
        .storage
        .from(env)
    .createSignedUrl(imagePath, 60)

    if (error) {
        console.error(`Move ${move.id}: Could not load signed url for image`);
        const { data: undefinedMoveImageData, error } = await supabase
            .storage
            .from(env)
            .createSignedUrl(UNDEFINED_MOVE_IMAGE_URL, 60)
            
        if (error) return { ...move,
            displayName: move.names[0].name,
        }

        return { ...move,
            displayName: move.names[0].name,
            imageUrl: undefinedMoveImageData?.signedUrl
        }
    }

    return { ...move,
            displayName: move.names[0].name,
        imageUrl: moveImageData.signedUrl
    }
}

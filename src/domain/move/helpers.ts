import { MoveForCombosScreen } from "@/shared/types/combo";
import { undefinedMoveImageUrl } from "@/src/config/constants";
import { supabase } from "@/src/services/supabaseClient";

const env = process.env.ENV!

export async function getMoveWithSignedUrl(move: MoveForCombosScreen): Promise<MoveForCombosScreen> {
    const imagePath = move.imageUrl ?? undefinedMoveImageUrl;
    const { data, error } = await supabase
        .storage
        .from(env)
    .createSignedUrl(imagePath, 60)

    if (error) {
        throw new Error(`Move ${move.id}: Could not load signed url for image`)
    }

    return { ...move,
        imageUrl: data.signedUrl
    }
}

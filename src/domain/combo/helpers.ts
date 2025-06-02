import { ComboForCombosScreen } from "@/shared/types/combo";
import { ComboQueryResponse } from "@/src/api/combos";
import { getMoveWithSignedUrl } from "@/src/domain/move/helpers";

export async function getComboWithSignedUrls(combo: ComboQueryResponse): Promise<ComboQueryResponse> {
            return {
                ...combo,
                movesInCombo: await Promise.all(
                    combo.movesInCombo.map(
                        async (moveInCombo) => {
                            const moveWithSignedUrl = await getMoveWithSignedUrl(moveInCombo.move)
                            
                            return {
                                ...moveInCombo,
                                move: {
                                    id: moveWithSignedUrl.id,
                                    name: moveWithSignedUrl.name,
                                    imageUrl: moveWithSignedUrl.imageUrl,
                            }
                        }}
                    )
                )
            }
}

export async function toComboWithMoves(combo: ComboForCombosScreen): Promise<ComboQueryResponse>  {
        return { 
            comboId: combo.id,
            name: combo.name,
            movesInCombo: await Promise.all(combo.movesInCombo.map(async (mic) => {
                return {
                    moveId: mic.moveId,
                    rank: mic.rank,
                    name: mic.move.name,
                    imageUrl: mic.move.imageUrl,
                }})
            )
        }
    }
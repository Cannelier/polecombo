import { ComboForCombosScreen } from "@/shared/types/combo";
import { ComboQueryResponse } from "@/src/api/combos";
import { getMoveWithSignedUrl } from "@/src/domain/move/helpers";

export async function getComboWithSignedUrls(combo: ComboForCombosScreen): Promise<ComboQueryResponse> {
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
                                    displayName: moveWithSignedUrl.names[0].name,
                                    imageUrl: moveWithSignedUrl.imageUrl,
                                    styles: moveWithSignedUrl.styles,
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
                    displayName: mic.move.displayName,
                    imageUrl: mic.move.imageUrl,
                    styles: mic.move.styles,
                }})
            )
        }
    }
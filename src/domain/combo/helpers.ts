import { ComboQueryResponse } from "@/src/api/combos";
import { getMoveWithSignedUrl } from "@/src/domain/move/helpers";

export async function getComboWithSignedUrls(combo) {
            return {
                ...combo,
                movesInCombo: await Promise.all(
                    combo.movesInCombo.map(
                        async (moveInCombo) => {
                            const moveWithSignedUrl = await getMoveWithSignedUrl(moveInCombo.move)
                            
                            return {
                                ...moveInCombo,
                                move: {
                                    imageUrl: moveWithSignedUrl.imageUrl,
                            }
                        }}
                    )
                )
            }
}

export async function toComboWithMoves(combo): Promise<ComboQueryResponse>  {
        return { 
            comboId: combo.id,
            name: combo.name,
            movesInCombo: await Promise.all(combo.movesInCombo.map(async (mic) => {
                const moveWithSignedUrl = await getMoveWithSignedUrl(mic.move);

                return {
                    moveId: mic.moveId,
                    rank: mic.rank,
                    name: moveWithSignedUrl.name,
                    imageUrl: moveWithSignedUrl.imageUrl,
                    codeNo: moveWithSignedUrl.codeNo
                }})
            )
        }
    }
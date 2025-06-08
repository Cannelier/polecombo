import { ComboModel } from "@/prisma/zod/combo"
import { z } from "zod"

export const ComboSchema = ComboModel
export type ComboData = z.infer<typeof ComboSchema>
export const CombosSchema = z.array(ComboSchema)
export type CombosData = z.infer<typeof CombosSchema>

export interface ComboForCombosScreen {
    name: string;
    id: number;
    movesInCombo: ({
        move: MoveForCombosScreen;
    } & {
        moveId: number;
        comboId: number;
        rank: number;
    })[];
}

export interface MoveForCombosScreen {
            id: number;
            displayName: string;
            names: {
                name: string
            }[],
            imageUrl: string;
        }
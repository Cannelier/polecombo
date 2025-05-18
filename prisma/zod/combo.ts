import * as z from "zod"
import { CompleteComboMove, RelatedComboMoveModel } from "./index"

export const ComboModel = z.object({
  id: z.number().int(),
  name: z.string(),
})

export interface CompleteCombo extends z.infer<typeof ComboModel> {
  movesInCombo: CompleteComboMove[]
}

/**
 * RelatedComboModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedComboModel: z.ZodSchema<CompleteCombo> = z.lazy(() => ComboModel.extend({
  movesInCombo: RelatedComboMoveModel.array(),
}))

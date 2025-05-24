import * as z from "zod"
import { CompleteCombo, RelatedComboModel, CompleteMove, RelatedMoveModel } from "./index"

export const ComboMoveModel = z.object({
  comboId: z.number().int(),
  moveId: z.number().int(),
  rank: z.number().int(),
})

export interface CompleteComboMove extends z.infer<typeof ComboMoveModel> {
  combo: CompleteCombo
  move: CompleteMove
}

/**
 * RelatedComboMoveModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedComboMoveModel: z.ZodSchema<CompleteComboMove> = z.lazy(() => ComboMoveModel.extend({
  combo: RelatedComboModel,
  move: RelatedMoveModel,
}))

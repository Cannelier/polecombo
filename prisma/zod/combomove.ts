import * as z from "zod"
import { CompleteMove, RelatedMoveModel, CompleteCombo, RelatedComboModel } from "./index"

export const ComboMoveModel = z.object({
  comboId: z.number().int(),
  moveId: z.number().int(),
  rank: z.number().int(),
})

export interface CompleteComboMove extends z.infer<typeof ComboMoveModel> {
  move: CompleteMove
  combo: CompleteCombo
}

/**
 * RelatedComboMoveModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedComboMoveModel: z.ZodSchema<CompleteComboMove> = z.lazy(() => ComboMoveModel.extend({
  move: RelatedMoveModel,
  combo: RelatedComboModel,
}))

import * as z from "zod"
import { CompleteComboMove, RelatedComboMoveModel } from "./index"

export const MoveModel = z.object({
  id: z.number().int(),
  code_no: z.string(),
  name: z.string(),
  image_url: z.string().nullish(),
  tech_value: z.number(),
})

export interface CompleteMove extends z.infer<typeof MoveModel> {
  combos: CompleteComboMove[]
}

/**
 * RelatedMoveModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMoveModel: z.ZodSchema<CompleteMove> = z.lazy(() => MoveModel.extend({
  combos: RelatedComboMoveModel.array(),
}))

import * as z from "zod"
import { CompleteMove, RelatedMoveModel } from "./index"

export const MoveNameModel = z.object({
  id: z.number().int(),
  name: z.string(),
  moveId: z.number().int(),
})

export interface CompleteMoveName extends z.infer<typeof MoveNameModel> {
  move: CompleteMove
}

/**
 * RelatedMoveNameModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMoveNameModel: z.ZodSchema<CompleteMoveName> = z.lazy(() => MoveNameModel.extend({
  move: RelatedMoveModel,
}))

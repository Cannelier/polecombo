import * as z from "zod"
import { Level, MoveStyle } from "@prisma/client"
import { CompleteComboMove, RelatedComboMoveModel, CompleteUser, RelatedUserModel } from "./index"

export const ComboModel = z.object({
  id: z.number().int(),
  name: z.string(),
  level: z.nativeEnum(Level),
  styles: z.nativeEnum(MoveStyle).array(),
  createdByUserId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteCombo extends z.infer<typeof ComboModel> {
  movesInCombo: CompleteComboMove[]
  createdByUser: CompleteUser
}

/**
 * RelatedComboModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedComboModel: z.ZodSchema<CompleteCombo> = z.lazy(() => ComboModel.extend({
  movesInCombo: RelatedComboMoveModel.array(),
  createdByUser: RelatedUserModel,
}))

import { MoveStyle } from "@prisma/client"
import * as z from "zod"
import { CompleteComboMove, CompleteMoveName, CompleteUser, RelatedComboMoveModel, RelatedMoveNameModel, RelatedUserModel } from "./index"

export const MoveModel = z.object({
  id: z.number().int(),
  ipsfCode: z.string().nullish(),
  posaCode: z.string().nullish(),
  imageUrl: z.string().nullish(),
  ipsfTechValue: z.number().nullish(),
  posaTechValue: z.number().nullish(),
  styles: z.nativeEnum(MoveStyle).array(),
  createdByUserId: z.string().nullish(),
})

export interface CompleteMove extends z.infer<typeof MoveModel> {
  names: CompleteMoveName[]
  combos: CompleteComboMove[]
  createdByUser?: CompleteUser | null
}

/**
 * RelatedMoveModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMoveModel: z.ZodSchema<CompleteMove> = z.lazy(() => MoveModel.extend({
  names: RelatedMoveNameModel.array(),
  combos: RelatedComboMoveModel.array(),
  createdByUser: RelatedUserModel.nullish(),
}))

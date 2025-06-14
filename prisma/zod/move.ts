import * as z from "zod"
import { MoveStyle, Level } from "@prisma/client"
import { CompleteMoveName, RelatedMoveNameModel, CompleteComboMove, RelatedComboMoveModel, CompleteUser, RelatedUserModel } from "./index"

export const MoveModel = z.object({
  id: z.number().int(),
  ipsfCode: z.string().nullish(),
  posaCode: z.string().nullish(),
  imageUrl: z.string().nullish(),
  ipsfTechValue: z.number().nullish(),
  posaTechValue: z.number().nullish(),
  styles: z.nativeEnum(MoveStyle).array(),
  level: z.nativeEnum(Level),
  createdByUserId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
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

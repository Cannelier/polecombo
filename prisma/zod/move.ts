import * as z from "zod"
import { MoveStyle } from "@prisma/client"
import { CompleteComboMove, RelatedComboMoveModel } from "./index"

export const MoveModel = z.object({
  id: z.number().int(),
  names: z.string().array(),
  namesSearch: z.string().nullish(),
  ipsfCode: z.string().nullish(),
  posaCode: z.string().nullish(),
  imageUrl: z.string().nullish(),
  ipsfTechValue: z.number().nullish(),
  posaTechValue: z.number().nullish(),
  styles: z.nativeEnum(MoveStyle).array(),
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

import * as z from "zod"

export const UserModel = z.object({
  id: z.number().int(),
  email: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  createdAt: z.date(),
})

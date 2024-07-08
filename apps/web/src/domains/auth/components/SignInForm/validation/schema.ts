import { z } from 'zod'
export const signInValidationForm = z.object({
  username: z.string(),
  password: z.string(),
})

export type TSignInValidationSchema = z.infer<typeof signInValidationForm>

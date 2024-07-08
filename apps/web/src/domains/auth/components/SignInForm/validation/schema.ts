import { z } from 'zod'
export const signInValidationForm = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export type TSignInValidationSchema = z.infer<typeof signInValidationForm>

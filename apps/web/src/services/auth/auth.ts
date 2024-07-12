import { createApiHandler } from '@/services/utils'
import { TSignInValidationSchema } from '@/domains/auth/components/SignInForm/validation/schema'
import axios from 'axios'

export const login = createApiHandler(
  async (credentials: TSignInValidationSchema) =>
    await axios.post(`/auth/login`, credentials),
  ['login'],
)

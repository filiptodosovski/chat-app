import { FormProvider, useForm } from 'react-hook-form'
import {
  signInValidationForm,
  TSignInValidationSchema,
} from '@/domains/auth/components/SignInForm/validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '@/form-fields/FormInput/FormInput'

export const SignInForm = () => {
  const methods = useForm<TSignInValidationSchema>({
    resolver: zodResolver(signInValidationForm),
    mode: 'onChange',
  })

  const handleOnSubmit = (data: TSignInValidationSchema) => {
    console.log('submited', data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 w-[300px]">
            <FormInput
              name="username"
              type="text"
              label="Username"
              placeholder="Enter your username"
            />
            <FormInput
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
          </div>
          <div className="self-center">
            <button
              type="submit"
              className="px-4 py-2 bg-buttonPrimary text-white rounded mt-4"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

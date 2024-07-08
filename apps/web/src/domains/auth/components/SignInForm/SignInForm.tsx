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

  const handleOnSubmit = () => {
    console.log('submited')
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
        <div>
          <FormInput name="username" />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  )
}

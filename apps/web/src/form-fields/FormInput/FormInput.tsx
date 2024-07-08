import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form'
import { Input } from '@components/common/Input/Input'
import { IInputProps } from '@components/common/Input/types'

interface IFormInputProps<T> extends IInputProps {
  name: Path<T>
}

export const FormInput = <T extends FieldValues>({
  name,
  ...props
}: IFormInputProps<T>) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  return <Input {...field} {...props} />
}

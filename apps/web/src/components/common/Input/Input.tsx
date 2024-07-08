import { IInputProps } from '@components/common/Input/types'
import { forwardRef, Ref } from 'react'

export const InputComponent = (
  { name, label, className, value, ...props }: IInputProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <>
      <input
        name={name}
        value={value}
        className="border-[1px] h-8 w-full p-3 placeholder:opacity-50 text-sm"
        ref={ref}
        {...props}
      ></input>
    </>
  )
}

export const Input = forwardRef(InputComponent)

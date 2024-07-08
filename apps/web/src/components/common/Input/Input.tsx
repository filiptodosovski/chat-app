import { IInputProps } from '@components/common/Input/types'
import { forwardRef, Ref } from 'react'

export const InputComponent = (
  { name, label, className, value, error, placeholder, ...props }: IInputProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <>
      <div>
        <label htmlFor="{name}" className="mt-2">
          {label}
        </label>
        <input
          name={name}
          value={value}
          placeholder={placeholder}
          className="border-[1px] p-2 h-8 w-full placeholder:opacity-50 text-sm"
          ref={ref}
          {...props}
        ></input>
        <p className="text-xs text-red-600 mb-2">{error}</p>
      </div>
    </>
  )
}

export const Input = forwardRef(InputComponent)

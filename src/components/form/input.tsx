import { forwardRef } from 'react'
import { cn } from '@/utils'
import { useFormField } from '@/contexts'
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form'

export type InputProps = React.ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...rest }, forwardedRef) => {
  const { register } = useFormContext()
  const { errorId, fieldState, id, name } = useFormField()

  const registrationOptions: RegisterOptions<FieldValues, string> = {}

  // Add input type-specific options as-needed
  switch (rest.type) {
    case 'date':
      registrationOptions.valueAsDate = true
      break
    case 'number':
      registrationOptions.valueAsNumber = true
      break
  }

  return (
    <input
      className={cn(
        'form-input w-fit shrink-0 px-4 py-2 rounded h-12 border-accent-300 shadow placeholder:text-accent-600 bg-background',
        className,
      )}
      name={name}
      aria-label={name}
      aria-invalid={fieldState.invalid}
      aria-errormessage={fieldState.invalid && errorId}
      id={id}
      ref={forwardedRef}
      {...register(name, registrationOptions)}
      {...rest}
    />
  )
})

Input.displayName = 'Input'

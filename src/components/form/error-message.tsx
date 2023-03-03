import { ErrorMessage as RHFErrorMessage } from '@hookform/error-message'
import { useFormField } from '@/contexts'
import { cn } from '@/utils'

export type ErrorMessageProps = React.ComponentPropsWithoutRef<'span'>

export function ErrorMessage({ className, ...rest }: ErrorMessageProps) {
  const { errorId, name, formErrors } = useFormField()

  return (
    <RHFErrorMessage
      errors={formErrors}
      name={name}
      render={({ message }) => (
        <span
          className={cn('animate-in fade-in slide-in-from-top text-danger-base text-sm mt-2', className)}
          role="alert"
          id={errorId}
          {...rest}
        >
          {message}
        </span>
      )}
    />
  )
}

import {
  FormProvider,
  type FieldValues,
  type FormProviderProps,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form'

export interface FormProps<TFieldValues extends FieldValues> extends FormProviderProps<TFieldValues> {
  children: React.ReactNode
  className?: string
  onInvalid?: SubmitErrorHandler<TFieldValues>
  onValid: SubmitHandler<TFieldValues>
}

export function Form<TFieldValues extends FieldValues>({
  children,
  className,
  onInvalid,
  onValid,
  ...rest
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...rest}>
      <form className={className} onSubmit={rest.handleSubmit(onValid, onInvalid)}>
        {children}
      </form>
    </FormProvider>
  )
}

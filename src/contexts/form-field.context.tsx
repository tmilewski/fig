import { createContext, useContext, useId } from 'react'
import { FieldErrors, FieldValues, UseFormRegister, FieldError, useFormContext, useFormState } from 'react-hook-form'

// Not exported from RHF
export interface FormFieldState {
  invalid: boolean
  isDirty: boolean
  isTouched: boolean
  error?: FieldError
}

export interface FormFieldContextValue {
  /**
   * Unique ID for the error message
   */
  errorId: string
  /**
   * All RHF form errors
   */
  formErrors: FieldErrors<FieldValues>
  /**
   * RHF field state
   */
  fieldState: FormFieldState
  /**
   * Unique ID for the field
   */
  id: string
  /**
   * Form field name
   */
  name: string
  /**
   * Field value
   */
  value: string
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null)

export function useFormField() {
  const ctx = useContext(FormFieldContext)

  if (ctx === undefined) throw new Error('`useFieldContext` must be used within `FieldProvider`')

  return ctx
}

export interface FormFieldProviderProps {
  children: React.ReactNode
  name: string
}

export function FormFieldProvider({ children, name }: FormFieldProviderProps) {
  const id = useId()
  const form = useFormContext()
  const formState = useFormState()

  const value: FormFieldContextValue = {
    formErrors: formState.errors,
    errorId: `${id}-error`,
    get fieldState() {
      return form.getFieldState(name)
    },
    id,
    name,
    get value() {
      return form.getValues(name)
    },
  }

  return <FormFieldContext.Provider value={value}>{children}</FormFieldContext.Provider>
}

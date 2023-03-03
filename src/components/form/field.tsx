import { FormFieldProvider, type FormFieldProviderProps } from '@/contexts'

export type FieldProps = FormFieldProviderProps

export function Field(props: FieldProps) {
  return <FormFieldProvider {...props} />
}

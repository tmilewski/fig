import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ErrorMessage, Field, Form, Input, Label, Submit } from '@/components/form'

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter an item name' }),
    start: z.date({
      invalid_type_error: 'Invalid start date',
      required_error: 'Please enter a start date',
    }),
    end: z.date({
      invalid_type_error: 'Invalid end date',
      required_error: 'Please enter an end date',
    }),
  })
  .refine((schema) => schema.start.getTime() < schema.end.getTime(), {
    path: ['start'],
    message: 'The start date must be before the end date',
  })

// type FormValues = z.infer<typeof schema>
interface FormValues {
  name: string
  start: Date
  end: Date
}

export interface GanttChartFormProps extends Omit<React.ComponentPropsWithoutRef<'form'>, 'children' | 'onInvalid'> {
  onValid: SubmitHandler<FormValues>
  onInvalid?: SubmitErrorHandler<FormValues>
}

export const GanttChartForm = ({ onValid, onInvalid }: GanttChartFormProps) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    shouldUseNativeValidation: false,
  })

  return (
    <>
      <Form
        className="flex flex-col md:flex-row gap-2 max-w-lg items-start"
        onValid={onValid}
        onInvalid={onInvalid}
        {...methods}
      >
        <Field name="name">
          <div className="flex flex-col gap-1">
            <Label hidden>Item Name</Label>
            <Input placeholder="Item name" type="text" />
            <ErrorMessage />
          </div>
        </Field>

        <Field name="start">
          <div className="flex flex-col gap-1">
            <Label hidden>Start Date</Label>
            <Input type="date" />
            <ErrorMessage />
          </div>
        </Field>

        <Field name="end">
          <div className="flex flex-col gap-1">
            <Label hidden>End Date</Label>
            <Input type="date" />
            <ErrorMessage />
          </div>
        </Field>

        <Submit>Add</Submit>
      </Form>
    </>
  )
}

import { useFormField } from '@/contexts'
import { cn } from '@/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const labelVariants = cva('', {
  variants: {
    hidden: {
      true: 'sr-only',
    },
  },
  defaultVariants: {
    hidden: false,
  },
})

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'>, VariantProps<typeof labelVariants> {}

export function Label({ className, ...rest }: LabelProps) {
  const { name } = useFormField()
  return <label htmlFor={name} className={cn('sr-only', className)} {...rest} />
}

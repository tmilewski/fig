import { cn } from '@/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva('transition-color', {
  variants: {
    intent: {
      primary: 'text-white bg-blue-light hover:bg-blue-base',
      danger: 'text-white bg-danger-base hover:bg-danger-dark',
      none: 'text-accent-900 bg-transparent hover:bg:transparent',
    },
    rounded: {
      true: 'rounded',
    },
    shadow: {
      true: 'shadow',
    },
    size: {
      sm: 'px-3 py-1 text-xs font-semibold',
      base: 'px-6 py-2 h-12 text-sm font-semibold',
      'icon-only': 'p-1',
    },
  },
  defaultVariants: {
    intent: 'primary',
    rounded: true,
    size: 'base',
  },
})

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonVariants> {}

export function Button({ className, intent, rounded, shadow, size, ...rest }: ButtonProps) {
  return <button className={cn(buttonVariants({ intent, rounded, shadow, size }), className)} {...rest} />
}

import { cn } from '@/utils'

export interface CurrentDayMarkerProps extends React.ComponentPropsWithoutRef<'div'> {
  offset: number
}

export function CurrentDayMarker({ className, offset, style, ...rest }: CurrentDayMarkerProps) {
  return (
    <div
      className={cn(
        'absolute pointer-events-none border-l-[1px] border-red-base h-full border-opacity-30 border-dashed leading-none',
        className,
      )}
      style={{
        ...style,
        left: offset,
      }}
      {...rest}
    />
  )
}

export type CurrentDayMarkerLabelProps = React.ComponentPropsWithoutRef<'span'>

export function CurrentDayMarkerLabel({ className, ...rest }: CurrentDayMarkerLabelProps) {
  return (
    <span
      className={cn(
        'pointer-events-auto px-4 py-2 -m-[1px] text-xs text-accent-900 font-semibold opacity-70 bg-red-lighter',
        className,
      )}
      {...rest}
    />
  )
}

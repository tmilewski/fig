import { useMachine } from '@xstate/react'
import { createGanttMachine } from '@/machines/gantt'
import { GanttChartItem } from './gantt-chart-item'
import { GanttChartForm } from './gantt-chart-form'
import { CurrentDayMarker, CurrentDayMarkerLabel } from '@/ui/current-day-marker'

export interface GanttChartProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  items: Item[]
}

/**
 * Current Date (i.e.: Today) placeholder
 *
 * NOTE: This is a placeholder for the current day as the item date constants are
 * fixed past dates. Feel free to update this and it'll work appropriately.
 */
const TODAY_PLACEHOLDER = new Date('2022-10-10 00:00:00')

export const GanttChart = ({ items, ...rest }: GanttChartProps) => {
  // Using
  const [state, send] = useMachine(() => createGanttMachine(items, TODAY_PLACEHOLDER), {
    devTools: process.env.NEXT_PUBLIC_XSTATE_DEVTOOLS === 'true',
  })
  const { context } = state

  const isEmpty = state.matches('empty')

  return (
    <div {...rest}>
      <GanttChartForm
        onValid={(values) => {
          send({
            type: 'ADD',
            value: values,
          })
        }}
      />

      <hr className="border-accent-300" />

      {isEmpty ? (
        <p>You don&apos;t have any items! Please add one above.</p>
      ) : (
        <div className="relative overflow-x-auto">
          <CurrentDayMarker offset={context.currentDayOffset}>
            <CurrentDayMarkerLabel>Today</CurrentDayMarkerLabel>
          </CurrentDayMarker>

          <div className="flex flex-col gap-4 text-sm pt-14">
            {context.items.map((item) => (
              <GanttChartItem actorRef={item.ref} key={item.id} rootOffset={context.rootOffset} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

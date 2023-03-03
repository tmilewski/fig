import { useMachine } from '@xstate/react'
import { ganttMachine } from '@/machines/gantt'
import { GanttChartItem } from './gantt-chart-item'
import { GanttChartForm } from './gantt-chart-form'
import { CurrentDayMarker, CurrentDayMarkerLabel } from '@/ui/current-day-marker'

export interface GanttChartProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  items: Item[]
}

export const GanttChart = ({ items, ...rest }: GanttChartProps) => {
  const [state, send] = useMachine(ganttMachine)
  const { context } = state

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

      <div className="relative overflow-x-auto">
        <CurrentDayMarker offset={context.currentDayOffet}>
          <CurrentDayMarkerLabel>Today</CurrentDayMarkerLabel>
        </CurrentDayMarker>

        <div className="flex flex-col gap-4 text-sm pt-14">
          {context.items.map((item) => (
            <GanttChartItem actorRef={item.ref} key={item.id} rootOffset={context.rootOffset} />
          ))}
        </div>
      </div>
    </div>
  )
}

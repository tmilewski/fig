import { useActor } from '@xstate/react'
import { type GanttItemActorRef } from 'machines/gantt'
import { X } from '@/ui/icons/x'
import { Button } from '@/ui/button'

export interface GanttChartItemProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  actorRef: GanttItemActorRef
  rootOffset: number
}

export function GanttChartItem({ actorRef, rootOffset }: GanttChartItemProps) {
  const [state, send] = useActor(actorRef)
  const { context } = state

  return (
    <div className="flex gap-4 group" data-cy="gantt-chart-item">
      <div
        className="h-6 rounded border-2 p-4 dark:opacity-75"
        style={{
          backgroundColor: context.display.color,
          borderColor: 'rgba(0, 0, 0, 0.05)', // TODO: Move to theme
          marginLeft: context.display.offset(rootOffset),
          width: context.display.width,
        }}
      />

      <label>
        <span className="text-sm">{context.name}</span>
        <span className="block text-xs font-thin dark:opacity-50">
          <time dateTime={context.display.date.start}>{context.display.date.start}</time> to{' '}
          <time dateTime={context.display.date.end}>{context.display.date.end}</time>
        </span>
      </label>

      <Button
        className="transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
        onClick={() => send('DELETE')}
        intent="danger"
        size="icon-only"
        shadow
      >
        <X aria-hidden="true" focusable="false" />
        <span className="sr-only">Remove {context.name}</span>
      </Button>
    </div>
  )
}

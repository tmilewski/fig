import { createMachine, assign, MachineConfig } from 'xstate'
import { createItemWithActor, sortItems, getRootOffset, calculateOffset } from './utils'

export interface GanttMachineContext {
  /**
   * The current date, i.e.: "Today"
   */
  currentDay: Date
  /**
   * The offset based on the current date
   */
  currentDayOffset?: number
  /**
   * The items of the Gantt chart
   */
  items?: ItemExtended[]
  /**
   * The offset based on the start date first item in the list
   */
  rootOffset: number
}

export type GanttMachineAddEvent = {
  type: 'ADD'
  value: Item
}

export type GanttMachineDeleteEvent = {
  type: 'DELETE'
  id: string
}

export type GanttMachineEvents = GanttMachineAddEvent | GanttMachineDeleteEvent

/**
 * Default context for the state machine
 */
export const defaultContext: GanttMachineContext = {
  currentDay: new Date(),
  currentDayOffset: 0,
  items: [],
  rootOffset: 0,
}

/**
 *
 * Initializes a Gantt chart state machine with default items and a date represending the current day.
 *
 * NOTE: I haven't worked with XState much, so I'm not sure if this is the best way to do all of this.
 * It's definitely overkill for the scope of this project, but it's meant to be a learning experience
 * and one which can be expanded on.
 *
 * @returns An initialized Gantt chart state machine for use with XState
 */
export function createGanttMachine(defaultItems: Item[] = [], currentDay?: Date) {
  const hydratedItems = defaultItems.map(createItemWithActor)

  const items = sortItems(hydratedItems)
  const rootOffset = getRootOffset(items)
  const currentDayOffset = calculateOffset(currentDay || defaultContext.currentDay, rootOffset)

  const context = {
    ...defaultContext,
    currentDay,
    currentDayOffset,
    items,
    rootOffset,
  }

  return createMachine(
    {
      id: 'ganttChart',
      predictableActionArguments: true,
      preserveActionOrder: true,
      context,
      initial: 'initial',
      states: {
        initial: {
          always: [{ target: 'empty', cond: 'isEmpty' }, 'idle'],
        },
        adding: {
          always: ['idle'],
        },
        deleting: {
          always: [{ target: 'empty', cond: 'isEmpty' }, 'idle'],
        },
        idle: {
          on: {
            ADD: {
              target: 'adding',
              actions: 'addItem',
            },

            DELETE: {
              target: 'deleting',
              actions: 'deleteItem',
            },
          },
        },
        empty: {
          on: {
            ADD: {
              target: 'adding',
              actions: 'addItem',
            },
          },
        },
      },
    } satisfies MachineConfig<GanttMachineContext, any, GanttMachineEvents>,
    // Based on the docs, there appear to be a number of type inference issues with the `createMachine` function. This works around a lot of it.
    {
      actions: {
        addItem: assign((ctx, evt: GanttMachineAddEvent) => {
          ctx.items.push(createItemWithActor(evt.value))

          ctx.items = sortItems(ctx.items)
          ctx.rootOffset = getRootOffset(ctx.items)
          ctx.currentDayOffset = calculateOffset(ctx.currentDay, ctx.rootOffset)

          return ctx
        }),
        deleteItem: assign((ctx, evt: GanttMachineDeleteEvent) => {
          const idx = ctx.items.findIndex((item) => item.id === evt.id)
          if (idx > -1) ctx.items.splice(idx, 1)

          ctx.rootOffset = getRootOffset(ctx.items)
          ctx.currentDayOffset = calculateOffset(ctx.currentDay, ctx.rootOffset)

          return ctx
        }),
      },
      guards: {
        isEmpty: (ctx: GanttMachineContext) => ctx.items.length === 0,
      },
    },
  )
}

import { createMachine, assign, spawn, actions } from 'xstate'
import { uuid } from '@/utils'
import { createGanttItemMachine } from './gantt-item.machine'
import { hslFromString } from '@/utils/hsl-from-string'
import { items as defaultItems } from 'constants/index'

interface GanttMachineAddItemEvent {
  type: 'ADD'
  value: Item
}

interface GanttMachineDeleteItemEvent {
  type: 'DELETE'
  id: string
}

type GanttMachineEvents = GanttMachineAddItemEvent | GanttMachineDeleteItemEvent

interface GantMachineContext {
  currentDayOffet?: number
  currentDay: Date
  items: ItemExtended[]
  rootOffset: number
}

const CURRENT_DAY = new Date('2022-10-10 00:00:00') // Placeholder for current day
const SCALE = 0.0000002
const DATE_FORMATTER = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: 'UTC',
})

/**
 * Creates an "extended" Item from an Item input
 */

function createItem({ name, start, end }: Item): ItemExtended {
  const unixStart = start.getTime()
  const unixEnd = end.getTime()

  return {
    id: uuid(),
    name,
    start,
    end,
    display: {
      color: hslFromString(name),
      date: {
        start: DATE_FORMATTER.format(start),
        end: DATE_FORMATTER.format(end),
      },
      offset: (offsetUnixStart) => (unixStart - offsetUnixStart) * SCALE,
      width: (unixEnd - unixStart) * SCALE,
    },
    unix: {
      start: unixStart,
      end: unixEnd,
    },
  }
}

export const ganttMachine = createMachine<GantMachineContext, GanttMachineEvents>(
  {
    id: 'ganttItems',
    predictableActionArguments: true,
    preserveActionOrder: true,
    context: {
      currentDay: CURRENT_DAY || new Date(),
      items: [],
      rootOffset: 0,
    },
    initial: 'initial',
    states: {
      initial: {
        entry: [
          'setDefaultItems', // Hydrate with default items
          'sortItems',
          'setRootOffset',
          'setCurrentDay',
        ],
        always: 'ready',
      },
      ready: {},
    },
    on: {
      ADD: {
        actions: ['addItem', 'sortItems', 'setRootOffset', 'setCurrentDay'],
      },
      DELETE: {
        actions: [
          'deleteItem',
          actions.choose([
            {
              cond: 'rootOffsetChanged',
              actions: ['setRootOffset', 'setCurrentDay'],
            },
          ]),
        ],
      },
    },
  },
  {
    actions: {
      // Adds items to the context
      addItem: assign({
        items: (ctx, evt: GanttMachineAddItemEvent) => {
          const newItem = createItem(evt.value)

          ctx.items.push({
            ...newItem,
            ref: spawn(createGanttItemMachine(newItem), newItem.id),
          })

          return ctx.items
        },
      }),

      // Removes an item from the context
      deleteItem: assign({
        items: (ctx, evt: GanttMachineDeleteItemEvent) => {
          const idx = ctx.items.findIndex((item) => item.id === evt.id)

          ctx.items.splice(idx, 1)

          return ctx.items
        },
      }),

      // Sorts all items in the context
      sortItems: assign({
        items: (ctx) => ctx.items.sort((a, b) => a.unix.start - b.unix.start),
      }),

      // Sets the current day offset
      setCurrentDay: assign({
        currentDayOffet: (ctx) => {
          return (ctx.currentDay.getTime() - ctx.rootOffset) * SCALE
        },
      }),

      // Hydrates default items to the context
      setDefaultItems: assign({
        items: () => {
          return defaultItems.map((item) => {
            const newItem = createItem(item)

            return {
              ...newItem,
              ref: spawn(createGanttItemMachine(newItem), newItem.id),
            }
          })
        },
      }),

      // Sets the root offset for which all left margin offsets are calculated
      setRootOffset: assign({
        rootOffset: (ctx) => ctx.items[0]?.unix.start || 0,
      }),
    },
    guards: {
      rootOffsetChanged: (ctx) => (ctx.items[0]?.unix.start || 0) !== ctx.rootOffset,
    },
  },
)

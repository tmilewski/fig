import { createMachine, sendParent, ActorRefFrom } from 'xstate'

export type GanttItemActorRef = ActorRefFrom<ReturnType<typeof createGanttItemMachine>>

/**
 *
 * Initializes a Gantt chart item state machine with the item's details.
 *
 * @returns An initialized Gantt chart item state machine for use with XState.
 */
export function createGanttItemMachine(item: ItemExtended) {
  return createMachine<ItemExtended>({
    id: 'ganttItem',
    predictableActionArguments: true,
    preserveActionOrder: true,
    context: item,
    on: {
      DELETE: {
        actions: sendParent((ctx) => ({
          type: 'DELETE',
          id: ctx.id,
        })),
      },
    },
  })
}

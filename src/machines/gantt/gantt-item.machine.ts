import { createMachine, assign, sendParent, ActorRefFrom } from 'xstate'

export type GanttItemActorRef = ActorRefFrom<ReturnType<typeof createGanttItemMachine>>

export const createGanttItemMachine = (item: ItemExtended) => {
  return createMachine({
    id: 'ganttItem',
    initial: 'default',
    predictableActionArguments: true,
    preserveActionOrder: true,
    context: {
      ...item,
    },
    schema: {
      context: {} as ItemExtended,
    },
    on: {
      DELETE: 'deleted',
    },
    states: {
      default: {},
      deleted: {
        onEntry: sendParent((ctx) => ({
          type: 'DELETE',
          id: ctx.id,
        })),
      },
    },
  })
}

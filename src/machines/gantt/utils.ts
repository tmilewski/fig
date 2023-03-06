import { spawn } from 'xstate'
import { uuid } from '@/utils'
import { createGanttItemMachine } from './gantt-item.machine'
import { hslFromString } from '@/utils/hsl-from-string'

/**
 * Scale used to convert unix timestamps to pixel values
 */
const SCALE = 0.0000002

/**
 * Date formatting with default options
 */
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
      offset: (rootOffset) => calculateOffset(unixStart, rootOffset),
      width: (unixEnd - unixStart) * SCALE,
    },
    unix: {
      start: unixStart,
      end: unixEnd,
    },
  }
}

/**
 * Creates an Extended Item with a state machine specific to the item and attaches the ref to
 * the base item
 */
export function createItemWithActor(item: Item) {
  const extendedItem = createItem(item)
  extendedItem.ref = spawn(createGanttItemMachine(extendedItem), extendedItem.id)

  return extendedItem
}

/**
 * Calculates difference of the offset of the item from the root offset (in milliseconds).
 * Converts the difference to a pixel value.
 */
export function calculateOffset(current: number, root: number): number
export function calculateOffset(current: Date, root: number): number
export function calculateOffset(current: Date | number, root: number): number {
  const currentNumeric = typeof current === 'number' ? current : current.getTime()
  return (currentNumeric - root) * SCALE
}

/**
 * Gets the root offset (unix timestamp) from the first item
 * Defaults to 0
 */
export function getRootOffset(items: ItemExtended[]) {
  return items[0]?.unix.start || 0
}

/**
 * Sorts items by start date (unix timestamp)
 */
export function sortItems(items: ItemExtended[]) {
  return items.sort((a, b) => a.unix.start - b.unix.start)
}

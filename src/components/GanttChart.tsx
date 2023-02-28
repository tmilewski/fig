import React, { useMemo } from "react"
import { getColorFromString } from "@parssa/universal-ui"

type DivProps = React.HTMLAttributes<HTMLDivElement>

// export const GanttItemContainer = ({ item }: {item: Item}) => {

// }

const scale = 0.0000002

// You can use `getColorFromString` to get the colors for the Gantt Chart rows
export const GanttChart = ({
  items,
  ...props
}: DivProps & {
  items: Item[]
}) => {
  const sortedItems = useMemo(() => {
    return items
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .map((item) => ({
        ...item,
        startDate: new Date(item.start).getTime(),
        endDate: new Date(item.end).getTime(),
      }))
  }, [items])

  // const totalTime = globalEndDate - globalStartDate

  return (
    <div className="flex flex-col gap-4 text-sm" {...props}>
      {sortedItems.map((item) => (
        <div className="flex gap-4">
          <div
            className="h-6 rounded"
            style={{
              backgroundColor: getColorFromString(item.name),
              marginLeft: (item.startDate - sortedItems[0].startDate) * scale,
              width: (item.startDate - item.endDate) * scale,
            }}
          ></div>
          <p>{item.name}</p>
        </div>
      ))}

      {/* Feel free to remove this */}
      <pre>{JSON.stringify(sortedItems, null, 2)}</pre>
    </div>
  )
}

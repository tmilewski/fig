import { GanttChart } from '@/components/gantt-chart'
import { items } from '@/constants'

export default function Home() {
  return (
    <>
      <main className="container min-h-screen py-24 prose lg:prose-xl max-w-none">
        <h1 className="mb-12">Gantt Chart Implementation</h1>
        <p className="text-xs">
          NOTE: Current Date is hard-coded to 10/10/2022, due to the dates set on the provided constants.
        </p>
        <GanttChart className="overflow-x-clip" items={items} />
      </main>
    </>
  )
}

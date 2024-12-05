"use client"

import Analytics from "../components/Analytics"
import { useTasks } from "../context/TaskContext"


export default function AnalyticsPage() {
  const { tasks } = useTasks()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <Analytics tasks={tasks} />
    </div>
  )
}


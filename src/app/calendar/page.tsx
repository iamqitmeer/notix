"use client"

import Calendar from '../components/Calendar'
import { useTasks } from '../context/TaskContext'

export default function CalendarPage() {
  const { tasks, updateTask } = useTasks()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Calendar</h1>
      <Calendar tasks={tasks} updateTask={updateTask} />
    </div>
  )
}


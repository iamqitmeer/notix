import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { useTasks } from "../context/TaskContext"

export default function Calendar() {
  const { tasks, updateTask } = useTasks()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const tasksOnSelectedDate = tasks.filter(task => 
    new Date(task.dueDate).toDateString() === selectedDate.toDateString()
  )

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border"
        />
        <div className="mt-4">
          <h3 className="font-semibold">Tasks on {selectedDate.toDateString()}:</h3>
          {tasksOnSelectedDate.length > 0 ? (
            <ul className="list-disc list-inside">
              {tasksOnSelectedDate.map(task => (
                <li key={task.id} className="flex items-center justify-between">
                  <span>{task.title}</span>
                  <Badge>{task.priority}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks scheduled for this date.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


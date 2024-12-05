"use client"

import { useTasks } from "../context/TaskContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function TaskSummary() {
  const { tasks } = useTasks()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length
  const dueSoonTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate)
    const today = new Date()
    const threeDaysFromNow = new Date(today.setDate(today.getDate() + 3))
    return dueDate <= threeDaysFromNow && !task.completed
  }).length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Overall Progress</p>
            <Progress value={completionRate} className="w-full mt-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {completedTasks} out of {totalTasks} tasks completed
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">High Priority Tasks</p>
            <p className="text-2xl font-bold">{highPriorityTasks}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Tasks Due Soon</p>
            <p className="text-2xl font-bold">{dueSoonTasks}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


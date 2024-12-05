"use client"

import { useTasks } from "../context/TaskContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, Clock } from 'lucide-react'

export default function RecentActivity() {
  const { tasks } = useTasks()

  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recentTasks.map(task => (
            <li key={task.id} className="flex items-center space-x-2">
              {task.completed ? (
                <CheckCircle2 className="text-green-500" />
              ) : (
                <Circle className="text-yellow-500" />
              )}
              <span>{task.title}</span>
              <Clock className="ml-auto" size={16} />
              <span className="text-sm text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


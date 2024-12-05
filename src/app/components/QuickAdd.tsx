"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTasks } from '../context/TaskContext'
import { useToast } from '@/hooks/use-toast'

export default function QuickAdd() {
  const [title, setTitle] = useState('')
  const { addTask } = useTasks()
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const newTask = {
      title,
      completed: false,
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      category: 'Quick Add',
      createdAt: new Date().toISOString()
    }

    addTask(newTask)
    setTitle('')
    toast({
      title: "Task Added",
      description: `"${title}" has been added to your tasks.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Add Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
          <Button type="submit">Add</Button>
        </form>
      </CardContent>
    </Card>
  )
}


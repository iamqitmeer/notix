"use client"

import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import { useTasks } from '../context/TaskContext'

export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  )
}


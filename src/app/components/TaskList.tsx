import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTasks } from "../context/TaskContext"

export default function TaskList() {
  const { tasks, updateTask, deleteTask } = useTasks()

  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [sortOrder, setSortOrder] = useState('asc')

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'active') return !task.completed
    return true
  }).sort((a, b) => {
    if (sortBy === 'dueDate') {
      return sortOrder === 'asc' 
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate)
    } else if (sortBy === 'priority') {
      const priorityOrder = { low: 1, medium: 2, high: 3 }
      return sortOrder === 'asc'
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    return 0
  })

  const toggleSort = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('asc')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All</Button>
            <Button variant={filter === 'active' ? 'default' : 'outline'} onClick={() => setFilter('active')}>Active</Button>
            <Button variant={filter === 'completed' ? 'default' : 'outline'} onClick={() => setFilter('completed')}>Completed</Button>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => toggleSort('dueDate')}>
              Due Date {sortBy === 'dueDate' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
            </Button>
            <Button variant="outline" onClick={() => toggleSort('priority')}>
              Priority {sortBy === 'priority' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTasks.map(task => (
          <div key={task.id} className="flex items-center space-x-2 mb-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) => updateTask({ ...task, completed: checked })}
            />
            <span className={`flex-grow ${task.completed ? 'line-through' : ''}`}>{task.title}</span>
            <Badge>{task.priority}</Badge>
            <Badge variant="outline">{new Date(task.dueDate).toLocaleDateString()}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => updateTask({ ...task, priority: 'low' })}>Set Low Priority</DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateTask({ ...task, priority: 'medium' })}>Set Medium Priority</DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateTask({ ...task, priority: 'high' })}>Set High Priority</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


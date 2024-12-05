import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { useTasks } from "../context/TaskContext"

export default function Analytics() {
  const { tasks } = useTasks()
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const priorityData = [
    { name: 'High', value: tasks.filter(task => task.priority === 'high').length },
    { name: 'Medium', value: tasks.filter(task => task.priority === 'medium').length },
    { name: 'Low', value: tasks.filter(task => task.priority === 'low').length },
  ]

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56']

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Task Completion</h3>
            <Progress value={completionRate} className="w-full" />
            <p className="text-sm mt-1">
              {completedTasks} out of {totalTasks} tasks completed ({completionRate.toFixed(2)}%)
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Tasks by Priority</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


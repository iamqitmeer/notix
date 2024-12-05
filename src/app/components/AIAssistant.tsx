import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

export default function AIAssistant({ tasks, addTask, updateTask }) {
  const [suggestion, setSuggestion] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateSuggestion = async () => {
    setIsLoading(true)
    // In a real application, you'd call an AI service here.
    // For this example, we'll simulate an API call with a delay.
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const suggestions = [
      {
        type: 'task_breakdown',
        content: "Consider breaking down the task 'Complete project proposal' into smaller subtasks: 1. Research market trends, 2. Outline key points, 3. Draft initial proposal, 4. Review and revise, 5. Prepare presentation slides."
      },
      {
        type: 'prioritization',
        content: "Based on your current tasks, I suggest prioritizing 'Prepare for client meeting' as high priority. It's due soon and could have a significant impact on your work."
      },
      {
        type: 'time_management',
        content: "You have several high-priority tasks due this week. Consider using the Pomodoro technique: work on each task for 25-minute focused sessions, followed by 5-minute breaks."
      },
      {
        type: 'new_task',
        content: "Based on your recurring patterns, you might want to add a new task: 'Weekly team sync-up meeting' every Monday at 10 AM."
      }
    ]
    
    setSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
    setIsLoading(false)
  }

  const applySuggestion = () => {
    if (suggestion.type === 'new_task') {
      addTask({
        title: suggestion.content.match(/'([^']+)'/)[1],
        completed: false,
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
        category: 'AI Suggested'
      })
    } else if (suggestion.type === 'prioritization') {
      const taskTitle = suggestion.content.match(/'([^']+)'/)[1]
      const task = tasks.find(t => t.title === taskTitle)
      if (task) {
        updateTask({ ...task, priority: 'high' })
      }
    }
    setSuggestion(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={generateSuggestion} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            'Get AI Suggestion'
          )}
        </Button>
        {suggestion && (
          <div className="mt-4">
            <p className="mb-2">{suggestion.content}</p>
            {(suggestion.type === 'new_task' || suggestion.type === 'prioritization') && (
              <Button onClick={applySuggestion} variant="outline">Apply Suggestion</Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


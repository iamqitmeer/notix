"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import { useTasks } from '../context/TaskContext'  // Assuming you have a task context for task management
import { useAI } from '../context/AIContext'        // Assuming the AI context is set up

export default function AIAssistantPage() {
  const { tasks } = useTasks()      // Retrieve tasks from TaskContext
  const { generateSuggestion, isLoading } = useAI()       // Retrieve generateSuggestion function from AIContext
  const [suggestion, setSuggestion] = useState(null)       // Local state for storing AI-generated suggestion

  // Function to handle generating a suggestion based on the current tasks
  const handleGenerateSuggestion = async () => {
    const newSuggestion = await generateSuggestion(tasks)  // Generate suggestion using tasks
    setSuggestion(newSuggestion)                           // Update state with the generated suggestion
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">AI Assistant</h1>
      
      {/* Card to display the AI Assistant section */}
      <Card>
        <CardHeader>
          <CardTitle>Get AI Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Button to trigger suggestion generation */}
          <Button onClick={handleGenerateSuggestion} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {/* Spinner for loading state */}
                Thinking...
              </>
            ) : (
              'Get AI Suggestion'
            )}
          </Button>
          
          {/* Display generated suggestion if available */}
          {suggestion && (
            <div className="mt-4">
              <div dangerouslySetInnerHTML={{ __html: suggestion }} /> {/* Render formatted HTML */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

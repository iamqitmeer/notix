"use client"

import { createContext, useContext, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const AIContext = createContext(null)

export function AIProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

  const generateSuggestion = async (tasks) => {
    setIsLoading(true)
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      const prompt = `Here are my current tasks: ${JSON.stringify(tasks)}. Please provide a suggestion to help me manage these tasks better.`
      const response = await model.generateContent(prompt)

      setIsLoading(false)
      return response.response.text() // Gemini API response handling
    } catch (error) {
      console.error('Error generating Gemini suggestion:', error)
      setIsLoading(false)
      return "I'm sorry, I couldn't generate a suggestion at this time."
    }
  }

  return (
    <AIContext.Provider value={{ generateSuggestion, isLoading }}>
      {children}
    </AIContext.Provider>
  )
}

export const useAI = () => useContext(AIContext)

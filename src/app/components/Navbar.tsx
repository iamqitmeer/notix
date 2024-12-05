"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 mb-4">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo & Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-all">
            Dashboard
          </Link>
          <Link href="/tasks" className={`text-lg font-semibold ${pathname === '/tasks' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'} hover:text-blue-500 dark:hover:text-blue-400 transition-all`}>
            Tasks
          </Link>
          <Link href="/calendar" className={`text-lg font-semibold ${pathname === '/calendar' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'} hover:text-blue-500 dark:hover:text-blue-400 transition-all`}>
            Calendar
          </Link>
          <Link href="/analytics" className={`text-lg font-semibold ${pathname === '/analytics' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'} hover:text-blue-500 dark:hover:text-blue-400 transition-all`}>
            Analytics
          </Link>
          <Link href="/ai-assistant" className={`text-lg font-semibold ${pathname === '/ai-assistant' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'} hover:text-blue-500 dark:hover:text-blue-400 transition-all`}>
            AI Assistant
          </Link>
        </div>
        
        {/* Theme Toggle Button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            {theme === 'dark' ? <Sun className="h-[1.5rem] w-[1.5rem] text-yellow-500" /> : <Moon className="h-[1.5rem] w-[1.5rem] text-gray-600 dark:text-gray-300" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Responsive Navbar */}
      <div className="block md:hidden">
        <Button variant="ghost" className="w-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-center">
          Menu
        </Button>
      </div>
    </nav>
  )
}

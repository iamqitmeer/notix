import './globals.css'; // Import global styles here
import { ThemeProvider } from 'next-themes';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/react';

import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import { AIProvider } from './context/AIContext';

export const metadata = { description: 'Advanced task management with AI assistance' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TaskProvider>
            <AIProvider>
              <div className="min-h-screen bg-background text-foreground flex flex-col">
                <Navbar />
                <main className="flex-grow container mx-auto p-4">
                  {children}
                </main>
                <footer className="border-t py-4 text-center text-sm text-muted-foreground">
                  © 2023 TaskMaster Pro. All rights reserved.
                </footer>
              </div>
              <Toaster />
            </AIProvider>
          </TaskProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

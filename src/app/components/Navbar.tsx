"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Notix" },
    { href: "/tasks", label: "Tasks" },
    { href: "/calendar", label: "Calendar" },
    { href: "/analytics", label: "Analytics" },
    { href: "/ai-assistant", label: "AI Assistant" },
  ];

  return (
    <nav className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo & Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-xl font-bold text-zinc-800 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-all"
          >
            Notix
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium ${
                  pathname === link.href
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-zinc-600 dark:text-zinc-300"
                } hover:text-blue-500 dark:hover:text-blue-400 transition-all`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full border hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            {theme === "dark" ? (
              <Sun className="h-[1.5rem] w-[1.5rem] text-yellow-500" />
            ) : (
              <Moon className="h-[1.5rem] w-[1.5rem] text-zinc-600 dark:text-zinc-300" />
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full border hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu className="h-[1.5rem] w-[1.5rem] text-zinc-800 dark:text-zinc-300" />
          </button>
        </div>
      </div>

      {/* Mobile Responsive Navbar */}
      {mobileMenuOpen && (
        <div className="block md:hidden bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 px-4 text-lg font-medium ${
                pathname === link.href
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-zinc-600 dark:text-zinc-300"
              } hover:text-blue-500 dark:hover:text-blue-400 transition-all`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

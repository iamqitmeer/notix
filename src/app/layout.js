import { Inter } from "next/font/google"; // Import the Inter font
import localFont from "next/font/local";
import "./globals.css";
import UserNavbar from "@/components/custom/UserNavbar";

// Google Font: Inter
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "400", "700"], // Specify valid weights
  variable: "--font-inter", // Define a custom CSS variable for the font
});

// Local Fonts: Geist Sans and Geist Mono
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900", // Custom weight range for local fonts
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900", // Custom weight range for local fonts
});

export const metadata = {
  title: "Notix - Your Ultimate Personal Management Tool for Productivity & Finance",
  description:
    "Notix is a comprehensive personal management tool designed to streamline your life. Manage tasks, track finances, take smart notes, monitor habits, and more with AI-powered features, advanced insights, and calendar integration. Perfect for busy professionals, students, and anyone looking to improve productivity, stay organized, and achieve their goals. Experience smarter personal management with Notix today!",
  keywords:
    "personal management tool, task management app, finance tracker, productivity app, habit tracker, AI assistant, budget management, expense tracking, task reminders, note-taking, smart notes, calendar integration, task prioritization, financial insights, productivity boost, digital planner, personal growth app, work-life balance",
  author: "Qitmeer Raza",
  themeColor: "#00A4CC", // Customize with your brand's primary color
  robots: "index, follow", // Allows search engines to index the page and follow its links
  viewport: "width=device-width, initial-scale=1.0", // Ensures mobile responsiveness
  // Meta data as before...
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`} // Apply Inter and other fonts here
      >
        <UserNavbar />
        {children}
      </body>
    </html>
  );
}

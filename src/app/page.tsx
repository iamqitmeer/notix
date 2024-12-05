import QuickAdd from "./components/QuickAdd";
import RecentActivity from "./components/RecentActivity";
import TaskSummary from "./components/TaskSummary";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TaskSummary />
      <RecentActivity />
      <QuickAdd />
    </div>
  )
}


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTasks } from "../context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }
    setError("");
    addTask({
      title,
      completed: false,
      dueDate,
      priority,
      category,
    });
    setTitle("");
    setDueDate("");
    setPriority("medium");
    setCategory("");
  };

  return (
    <Card className="mb-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
      <CardHeader>
        <CardTitle className="text-zinc-800 dark:text-zinc-100">Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-700 dark:text-zinc-300">
              Task Title
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-zinc-700 dark:text-zinc-300">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority" className="text-zinc-700 dark:text-zinc-300">
              Priority
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger
                id="priority"
                className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              >
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">🟢 Low</SelectItem>
                <SelectItem value="medium">🟡 Medium</SelectItem>
                <SelectItem value="high">🔴 High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-zinc-700 dark:text-zinc-300">
              Category
            </Label>
            <Input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-zinc-50 dark:hover:bg-zinc-100 transition-all"
          >
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

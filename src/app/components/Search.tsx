import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Search({ tasks }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = () => {
    const results = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Tasks</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        {searchResults.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {searchResults.map(task => (
              <li key={task.id} className="flex justify-between items-center">
                <span>{task.title}</span>
                <span className="text-sm text-muted-foreground">{task.category}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-center text-muted-foreground">No results found</p>
        )}
      </DialogContent>
    </Dialog>
  )
}


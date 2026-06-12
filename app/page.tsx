"use client"

import { TaskForm } from "@/components/tasks/taskForm"
import { TaskList } from "@/components/tasks/taskList"
import { TaskFilter } from "@/components/tasks/taskFilter"
import { useTasks } from "@/hooks/useTasks"
import { Loader2 } from "lucide-react"

export default function Home() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    setFilter,
    filter,
    loading,
    isAdding,
    togglingId,
    deletingId,
    error,
    page,
    setPage,
    totalPages
  } = useTasks()

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-10 text-muted-foreground">
        <Loader2 className="animate-spin" size={20} />
        <p>Loading tasks...</p>
      </div>
    )
  }

  if (error) return <p className="text-center text-red-500 mt-6 sm:mt-10">Failed to load tasks</p>
  const getPages = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (page < 3) {
      return [1, 2, 3, "...", totalPages]
    }

    if (page > totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPages]
  }
  return (
    <main className="max-w-4xl w-full mx-auto mt-4 sm:mt-10 mb-4 sm:mb-10 space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <h1 className="text-xl sm:text-2xl font-bold text-center">Task Manager</h1>

      <TaskForm onAdd={addTask} isAdding={isAdding} />
      <TaskFilter filter={filter} setFilter={setFilter} setPage={setPage} />

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        togglingId={togglingId}
        deletingId={deletingId}
      />

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 items-center">
          {getPages().map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-1 sm:px-2 text-sm">
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setPage(p as number)}
                className={`min-w-8 px-2.5 sm:px-3 py-1 text-sm rounded cursor-pointer ${page === p ? "bg-primary text-white" : "bg-gray-200"
                  }`}
              >
                {p}
              </button>
            )
          )}
        </div>
      )}
    </main>
  )
}
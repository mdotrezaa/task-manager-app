"use client"

import { TaskForm } from "@/components/tasks/taskForm"
import { TaskList } from "@/components/tasks/taskList"
import { TaskFilter } from "@/components/tasks/taskFilter"
import { useTasks } from "@/hooks/useTasks"

export default function Home() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    setFilter,
    filter,
    loading,
    error,
    page,
    setPage,
    totalPages
  } = useTasks()

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center text-red-500">Error</p>
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
    <main className="max-w-4xl w-full mx-auto mt-10 space-y-6 bg-white p-6">
      <h1 className="text-2xl font-bold text-center">Task Manager</h1>

      <TaskForm onAdd={addTask} />
      <TaskFilter filter={filter} setFilter={setFilter} setPage={setPage} />

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 items-center">
          {getPages().map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setPage(p as number)}
                className={`px-3 py-1 rounded cursor-pointer ${page === p ? "bg-primary text-white" : "bg-gray-200"
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
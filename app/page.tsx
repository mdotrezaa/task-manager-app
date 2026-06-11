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

  return (
    <main className="max-w-xl w-full mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Task Manager</h1>

      <TaskForm onAdd={addTask} />
      <TaskFilter filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  )
}
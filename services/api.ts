import { Task } from "@/types/task"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

const headers = {
    "Content-Type": "application/json"
}

export const getTasks = async (): Promise<Task[]> => {
    const res = await fetch(`${API_URL}/tasks`)
    if (!res.ok) throw new Error("Failed to fetch tasks")
    return res.json()
}

export const createTask = async (title: string): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers,
        body: JSON.stringify({ title, completed: false })
    })
    if (!res.ok) throw new Error("Failed to create task")
    return res.json()
}

export const updateTask = async (task: Task): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(task)
    })
    if (!res.ok) throw new Error("Failed to update task")
    return res.json()
}

export const deleteTaskApi = async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    })
    if (!res.ok) throw new Error("Failed to delete task")
}
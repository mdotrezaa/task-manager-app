"use client"

import { TaskItem } from "./taskItem"
import { Task } from "@/types/task"

export const TaskList = ({
    tasks,
    onToggle,
    onDelete
}: {
    tasks: Task[]
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}) => {
    if (!tasks.length) {
        return <p className="text-center text-gray-400">No tasks found</p>
    }

    return (
        <div className="space-y-2">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => onToggle(task.id)}
                    onDelete={() => onDelete(task.id)}
                />
            ))}
        </div>
    )
}
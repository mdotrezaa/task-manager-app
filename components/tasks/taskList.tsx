"use client"

import { TaskItem } from "./taskItem"
import { Task } from "@/types/task"

export const TaskList = ({
	tasks,
	onToggle,
	onDelete,
	togglingId = null,
	deletingId = null,
}: {
	tasks: Task[]
	onToggle: (id: number) => void
	onDelete: (id: number) => void
	togglingId?: number | null
	deletingId?: number | null
}) => {
	if (!tasks.length) {
		return <p className="text-center text-sm sm:text-base text-gray-400 py-4">No tasks found</p>
	}

	return (
		<div className="space-y-2">
			{tasks.map(task => (
				<TaskItem
					key={task.id}
					task={task}
					onToggle={() => onToggle(task.id)}
					onDelete={() => onDelete(task.id)}
					isToggling={togglingId === task.id}
					isDeleting={deletingId === task.id}
				/>
			))}
		</div>
	)
}
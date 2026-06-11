"use client"

import { Task } from "@/types/task"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export const TaskItem = ({
	task,
	onToggle,
	onDelete
}: {
	task: Task
	onToggle: () => void
	onDelete: () => void
}) => {
	return (
		<div className="flex items-center justify-between p-3 border rounded-lg">
			<div className="flex items-center gap-2">
				<Checkbox checked={task.completed} onCheckedChange={onToggle} />
				<span className="word-wrap task-title" style={{ textDecoration: task.completed ? "line-through" : "none" }}>
					{task.title}
				</span>
			</div>

			<Button variant="destructive" size="sm" onClick={onDelete}>
				Delete
			</Button>
		</div>
	)
}
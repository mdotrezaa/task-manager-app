"use client"

import { Task } from "@/types/task"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react"

export const TaskItem = ({
	task,
	onToggle,
	onDelete,
	isToggling = false,
	isDeleting = false,
}: {
	task: Task
	onToggle: () => void
	onDelete: () => void
	isToggling?: boolean
	isDeleting?: boolean
}) => {
	const isBusy = isToggling || isDeleting

	return (
		<div
			className={`flex items-center justify-between gap-2 p-2.5 sm:p-3 border rounded-lg transition-opacity ${isBusy ? "opacity-60" : ""}`}
		>
			<div className="flex items-center gap-2 min-w-0 flex-1">
				<Checkbox
					className="shrink-0"
					checked={task.completed}
					disabled={isBusy}
					onCheckedChange={onToggle}
				/>
				<span
					className="break-words min-w-0 text-sm sm:text-base"
					style={{ textDecoration: task.completed ? "line-through" : "none" }}
				>
					{task.title}
				</span>
				{isToggling && <Loader2 className="shrink-0 animate-spin text-muted-foreground" size={14} />}
			</div>

			<Button
				className="shrink-0"
				variant="destructive"
				size="sm"
				onClick={onDelete}
				disabled={isBusy}
			>
				{isDeleting ? (
					<Loader2 className="animate-spin" size={16} />
				) : (
					<Trash2 size={16} />
				)}
			</Button>
		</div>
	)
}
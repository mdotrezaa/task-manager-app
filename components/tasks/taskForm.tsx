"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const TaskForm = ({ onAdd }: { onAdd: (title: string) => void }) => {
	const [title, setTitle] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = () => {
		if (!title.trim()) {
			setError("Task cannot be empty")
			return
		}

		onAdd(title)
		setTitle("")
		setError("")
	}

	return (
		<div className="space-y-2">
			<div className="flex gap-2">
				<Input
					value={title}
					onChange={e => setTitle(e.target.value)}
					placeholder="Add new task..."
				/>
				<Button onClick={handleSubmit}>Add</Button>
			</div>
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	)
}
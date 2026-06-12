"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export const TaskForm = ({
	onAdd,
	isAdding = false,
}: {
	onAdd: (title: string) => void
	isAdding?: boolean
}) => {
	const [title, setTitle] = useState("")
	const [error, setError] = useState("")
	const wasAdding = useRef(false)

	useEffect(() => {
		if (wasAdding.current && !isAdding) {
			setTitle("")
			setError("")
		}
		wasAdding.current = isAdding
	}, [isAdding])

	const handleSubmit = () => {
		if (isAdding) return

		if (!title.trim()) {
			setError("Task cannot be empty")
			return
		}

		onAdd(title.trim())
	}

	return (
		<div className="space-y-2">
			<div className="flex flex-col sm:flex-row gap-2">
				<Input
					className="flex-1"
					value={title}
					onChange={e => setTitle(e.target.value)}
					placeholder="Add new task..."
					disabled={isAdding}
				/>
				<Button
					className="w-full sm:w-auto shrink-0"
					onClick={handleSubmit}
					disabled={isAdding}
				>
					{isAdding ? (
						<>
							<Loader2 className="animate-spin" size={16} />
							Adding...
						</>
					) : (
						"Add"
					)}
				</Button>
			</div>
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	)
}
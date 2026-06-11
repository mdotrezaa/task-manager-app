"use client"

import { Button } from "@/components/ui/button"

export const TaskFilter = ({
	filter,
	setFilter
}: {
	filter: string
	setFilter: (f: "all" | "completed" | "pending") => void
}) => {
	return (
		<div className="flex gap-2">
			<Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
				All
			</Button>
			<Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")}>
				Pending
			</Button>
			<Button variant={filter === "completed" ? "default" : "outline"} onClick={() => setFilter("completed")}>
				Completed
			</Button>
		</div>
	)
}
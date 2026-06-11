"use client"

import { Button } from "@/components/ui/button"

export const TaskFilter = ({
	filter,
	setFilter,
	setPage
}: {
	filter: string
	setFilter: (f: "all" | "completed" | "pending") => void
	setPage: (page: number) => void
}) => {
	return (
		<div className="flex gap-2">
			<Button variant={filter === "all" ? "default" : "outline"} onClick={() => { setFilter("all"); setPage(1); }}>
				All
			</Button>
			<Button variant={filter === "pending" ? "default" : "outline"} onClick={() => { setFilter("pending"); setPage(1); }}>
				Pending
			</Button>
			<Button variant={filter === "completed" ? "default" : "outline"} onClick={() => { setFilter("completed"); setPage(1); }}>
				Completed
			</Button>
		</div>
	)
}
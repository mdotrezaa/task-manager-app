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
		<div className="grid grid-cols-3 gap-2 sm:flex sm:justify-end sm:gap-2">
			<Button className="w-full sm:w-auto" variant={filter === "all" ? "default" : "outline"} onClick={() => { setFilter("all"); setPage(1); }}>
				All
			</Button>
			<Button className="w-full sm:w-auto" variant={filter === "pending" ? "default" : "outline"} onClick={() => { setFilter("pending"); setPage(1); }}>
				Pending
			</Button>
			<Button className="w-full sm:w-auto" variant={filter === "completed" ? "default" : "outline"} onClick={() => { setFilter("completed"); setPage(1); }}>
				Completed
			</Button>
		</div>
	)
}
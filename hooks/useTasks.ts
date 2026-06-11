"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Task } from "@/types/task"
import {
	getTasks,
	createTask,
	updateTask,
	deleteTaskApi
} from "@/services/api"

const PAGE_SIZE = 5

export const useTasks = () => {
	const queryClient = useQueryClient()

	const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")
	const [page, setPage] = useState(1)

	const { data: tasks = [], isLoading, error } = useQuery({
		queryKey: ["tasks"],
		queryFn: getTasks
	})

	const addTaskMutation = useMutation({
		mutationFn: createTask,
		onSuccess: (_, title) => {
			const newTask = {
				id: Date.now(),
				title,
				completed: false
			}

			queryClient.setQueryData(["tasks"], (old: Task[] = []) => [
				newTask,
				...old
			])
		}
	})

	const toggleTaskMutation = useMutation({
		mutationFn: (task: Task) =>
			updateTask({ ...task, completed: !task.completed }),
		onSuccess: (_, task) => {
			const updatedTask = {
				...task,
				completed: !task.completed
			}

			queryClient.setQueryData(["tasks"], (old: Task[] = []) =>
				old.map(t => (t.id === updatedTask.id ? updatedTask : t))
			)
		}
	})

	const toggleTask = (id: number) => {
		const task = tasks.find(t => t.id === id)
		if (!task) return
		toggleTaskMutation.mutate(task)
	}

	const deleteTaskMutation = useMutation({
		mutationFn: deleteTaskApi,
		onMutate: async (id: number) => {
			await queryClient.cancelQueries({ queryKey: ["tasks"] })

			const previousTasks = queryClient.getQueryData<Task[]>(["tasks"])

			queryClient.setQueryData(["tasks"], (old: Task[] = []) =>
				old.filter(t => t.id !== id)
			)

			return { previousTasks }
		},
		onError: (_, __, context) => {
			if (context?.previousTasks) {
				queryClient.setQueryData(["tasks"], context.previousTasks)
			}
		}
	})

	const filteredTasks = tasks.filter(task => {
		if (filter === "completed") return task.completed
		if (filter === "pending") return !task.completed
		return true
	})

	const totalPages = Math.ceil(filteredTasks.length / PAGE_SIZE)

	const paginatedTasks = filteredTasks.slice(
		(page - 1) * PAGE_SIZE,
		page * PAGE_SIZE
	)

	return {
		tasks: paginatedTasks,
		filter,
		setFilter,
		page,
		setPage,
		totalPages,

		addTask: (title: string) => addTaskMutation.mutate(title),
		toggleTask,
		deleteTask: (id: number) => deleteTaskMutation.mutate(id),

		loading: isLoading,
		error
	}
}
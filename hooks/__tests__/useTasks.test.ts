import { renderHook, act, waitFor } from "@testing-library/react"
import { useTasks } from "@/hooks/useTasks"
import { createWrapper, createWrapperWithClient } from "../../tests/test-utils"
import * as api from "@/services/api"
import { Task } from "@/types/task"

jest.mock("@/services/api", () => ({
	getTasks: jest.fn(),
	createTask: jest.fn(),
	updateTask: jest.fn(),
	deleteTaskApi: jest.fn()
}))

const mockTasks = [
	{ id: 1, title: "Task 1", completed: false },
	{ id: 2, title: "Task 2", completed: true }
]

describe("useTasks", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("fetches tasks", async () => {
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => {
			expect(result.current.tasks.length).toBeGreaterThan(0)
		})
	})

	it("adds task on success", async () => {
		; (api.getTasks as jest.Mock).mockResolvedValue([])
			; (api.createTask as jest.Mock).mockResolvedValue({})

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => !result.current.loading)

		act(() => {
			result.current.addTask("New Task")
		})

		await waitFor(() => {
			expect(result.current.tasks[0].title).toBe("New Task")
		})
	})

	it("toggles task", async () => {
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)
			; (api.updateTask as jest.Mock).mockImplementation(async (task) => ({
				...task,
				completed: !task.completed
			}))

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.loading).toBe(false))

		await act(async () => {
			result.current.toggleTask(1)
		})

		await waitFor(() => {
			expect(result.current.tasks.find(t => t.id === 1)?.completed).toBe(true)
		})
	})

	it("deletes task (optimistic)", async () => {
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)
			; (api.deleteTaskApi as jest.Mock).mockResolvedValue({})

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => !result.current.loading)

		act(() => {
			result.current.deleteTask(1)
		})

		await waitFor(() => {
			expect(result.current.tasks.find(t => t.id === 1)).toBeUndefined()
		})
	})

	it("filters completed tasks", async () => {
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => !result.current.loading)

		act(() => {
			result.current.setFilter("completed")
		})

		expect(result.current.tasks).toHaveLength(1)
		expect(result.current.tasks[0].completed).toBe(true)
	})

	it("filters pending tasks", async () => {
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => !result.current.loading)

		act(() => {
			result.current.setFilter("pending")
		})

		expect(result.current.tasks).toHaveLength(1)
		expect(result.current.tasks[0].completed).toBe(false)
	})

	it("paginates tasks", async () => {
		const manyTasks = Array.from({ length: 7 }, (_, i) => ({
			id: i + 1,
			title: `Task ${i + 1}`,
			completed: false
		}))
		; (api.getTasks as jest.Mock).mockResolvedValue(manyTasks)

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.loading).toBe(false))

		await waitFor(() => {
			expect(result.current.tasks).toHaveLength(5)
		})
		expect(result.current.totalPages).toBe(2)

		act(() => {
			result.current.setPage(2)
		})

		expect(result.current.tasks).toHaveLength(2)
	})

	it("restores tasks when delete fails", async () => {
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)
			; (api.deleteTaskApi as jest.Mock).mockRejectedValue(new Error("Delete failed"))

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.loading).toBe(false))

		await act(async () => {
			result.current.deleteTask(1)
		})

		await waitFor(() => {
			expect(result.current.tasks.find(t => t.id === 1)).toBeDefined()
		})
	})

	it("shows all tasks with the default filter", async () => {
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.loading).toBe(false))

		expect(result.current.filter).toBe("all")
		expect(result.current.tasks).toHaveLength(2)
	})

	it("does nothing when toggling an unknown task id", async () => {
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.loading).toBe(false))

		act(() => {
			result.current.toggleTask(999)
		})

		expect(api.updateTask).not.toHaveBeenCalled()
	})

	it("exposes error when fetch fails", async () => {
		; (api.getTasks as jest.Mock).mockRejectedValue(new Error("Fetch failed"))

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.error).toBeTruthy())

		expect(result.current.tasks).toHaveLength(0)
		expect(result.current.totalPages).toBe(0)
	})

	it("exposes isAdding while create is in progress", async () => {
		let resolveCreate!: (value: object) => void
		const createPromise = new Promise<object>((resolve) => {
			resolveCreate = resolve
		})

		; (api.getTasks as jest.Mock).mockResolvedValue([])
			; (api.createTask as jest.Mock).mockReturnValue(createPromise)

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.loading).toBe(false))

		act(() => {
			result.current.addTask("New Task")
		})

		await waitFor(() => {
			expect(result.current.isAdding).toBe(true)
		})

		await act(async () => {
			resolveCreate({})
			await createPromise
		})

		await waitFor(() => {
			expect(result.current.isAdding).toBe(false)
		})
	})

	it("exposes togglingId while toggle is in progress", async () => {
		let resolveUpdate!: (value: Task) => void
		const updatePromise = new Promise<Task>((resolve) => {
			resolveUpdate = resolve
		})

		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)
			; (api.updateTask as jest.Mock).mockReturnValue(updatePromise)

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.loading).toBe(false))
		expect(result.current.togglingId).toBeNull()

		act(() => {
			result.current.toggleTask(1)
		})

		await waitFor(() => {
			expect(result.current.togglingId).toBe(1)
		})

		await act(async () => {
			resolveUpdate({ ...mockTasks[0], completed: true })
			await updatePromise
		})

		await waitFor(() => {
			expect(result.current.togglingId).toBeNull()
		})
	})

	it("exposes deletingId while delete is in progress", async () => {
		let resolveDelete!: () => void
		const deletePromise = new Promise<void>((resolve) => {
			resolveDelete = resolve
		})

		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)
			; (api.deleteTaskApi as jest.Mock).mockReturnValue(deletePromise)

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.loading).toBe(false))
		expect(result.current.deletingId).toBeNull()

		act(() => {
			result.current.deleteTask(1)
		})

		await waitFor(() => {
			expect(result.current.deletingId).toBe(1)
		})

		await act(async () => {
			resolveDelete()
			await deletePromise
		})

		await waitFor(() => {
			expect(result.current.deletingId).toBeNull()
		})
	})

	it("toggles a completed task back to pending", async () => {
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)
			; (api.updateTask as jest.Mock).mockImplementation(async (task) => ({
				...task,
				completed: !task.completed
			}))

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.loading).toBe(false))

		await act(async () => {
			result.current.toggleTask(2)
		})

		await waitFor(() => {
			expect(result.current.tasks.find(t => t.id === 2)?.completed).toBe(false)
		})
	})

	it("skips restore on delete failure when previous cache is missing", async () => {
		; (api.getTasks as jest.Mock).mockRejectedValue(new Error("Fetch failed"))
			; (api.deleteTaskApi as jest.Mock).mockRejectedValue(new Error("Delete failed"))

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.error).toBeTruthy())

		await act(async () => {
			result.current.deleteTask(1)
		})

		expect(result.current.tasks).toHaveLength(0)
	})

	it("adds task when query cache is empty", async () => {
		; (api.getTasks as jest.Mock).mockRejectedValue(new Error("Fetch failed"))
			; (api.createTask as jest.Mock).mockResolvedValue({
				id: 99,
				title: "New Task",
				completed: false
			})

		const { result } = renderHook(() => useTasks(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.error).toBeTruthy())

		act(() => {
			result.current.addTask("New Task")
		})

		await waitFor(() => {
			expect(result.current.tasks[0]?.title).toBe("New Task")
		})
	})

	it("completes toggle when query cache is cleared mid-mutation", async () => {
		let resolveUpdate!: (value: Task) => void
		const updatePromise = new Promise<Task>((resolve) => {
			resolveUpdate = resolve
		})

		const { queryClient, wrapper } = createWrapperWithClient()
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)
			; (api.updateTask as jest.Mock).mockReturnValue(updatePromise)

		const { result } = renderHook(() => useTasks(), { wrapper })

		await waitFor(() => expect(result.current.loading).toBe(false))

		act(() => {
			result.current.toggleTask(1)
		})

		queryClient.removeQueries({ queryKey: ["tasks"] })

		await act(async () => {
			resolveUpdate({ ...mockTasks[0], completed: true })
			await updatePromise
		})

		await waitFor(() => {
			expect(result.current.togglingId).toBeNull()
		})
	})

	it("handles delete error when optimistic update setup fails", async () => {
		const { queryClient, wrapper } = createWrapperWithClient()
		; (api.getTasks as jest.Mock).mockResolvedValue(mockTasks)
			; (api.deleteTaskApi as jest.Mock).mockRejectedValue(new Error("Delete failed"))

		jest.spyOn(queryClient, "cancelQueries").mockRejectedValue(new Error("Cancel failed"))

		const { result } = renderHook(() => useTasks(), { wrapper })

		await waitFor(() => expect(result.current.loading).toBe(false))

		await act(async () => {
			result.current.deleteTask(1)
		})

		await waitFor(() => {
			expect(result.current.tasks.find(t => t.id === 1)).toBeDefined()
		})
	})
})
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TaskForm } from "@/components/tasks/taskForm"

describe("TaskForm", () => {
	it("calls onAdd with trimmed title", async () => {
		const user = userEvent.setup()
		const onAdd = jest.fn()

		render(<TaskForm onAdd={onAdd} />)

		await user.type(screen.getByPlaceholderText("Add new task..."), "  New Task  ")
		await user.click(screen.getByRole("button", { name: "Add" }))

		expect(onAdd).toHaveBeenCalledWith("New Task")
	})

	it("shows validation error for empty title", async () => {
		const user = userEvent.setup()
		const onAdd = jest.fn()

		render(<TaskForm onAdd={onAdd} />)

		await user.click(screen.getByRole("button", { name: "Add" }))

		expect(screen.getByText("Task cannot be empty")).toBeInTheDocument()
		expect(onAdd).not.toHaveBeenCalled()
	})

	it("clears input after adding completes", async () => {
		const user = userEvent.setup()
		const onAdd = jest.fn()

		const { rerender } = render(<TaskForm onAdd={onAdd} />)

		await user.type(screen.getByPlaceholderText("Add new task..."), "New Task")

		rerender(<TaskForm onAdd={onAdd} isAdding />)
		rerender(<TaskForm onAdd={onAdd} isAdding={false} />)

		expect(screen.getByPlaceholderText("Add new task...")).toHaveValue("")
	})

	it("disables input and shows loading state while adding", () => {
		render(<TaskForm onAdd={() => {}} isAdding />)

		expect(screen.getByPlaceholderText("Add new task...")).toBeDisabled()
		expect(screen.getByRole("button", { name: /adding/i })).toBeDisabled()
	})
})

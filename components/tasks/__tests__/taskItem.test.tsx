import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TaskItem } from "@/components/tasks/taskItem"
import { Task } from "@/types/task"

const mockTask: Task = { id: 1, title: "Test Task", completed: false }

describe("TaskItem", () => {
	it("renders task title", () => {
		render(
			<TaskItem
				task={mockTask}
				onToggle={() => {}}
				onDelete={() => {}}
			/>
		)

		expect(screen.getByText("Test Task")).toBeInTheDocument()
	})

	it("calls onToggle when checkbox is clicked", async () => {
		const user = userEvent.setup()
		const onToggle = jest.fn()

		render(
			<TaskItem
				task={mockTask}
				onToggle={onToggle}
				onDelete={() => {}}
			/>
		)

		await user.click(screen.getByRole("checkbox"))

		expect(onToggle).toHaveBeenCalledTimes(1)
	})

	it("calls onDelete when delete button is clicked", async () => {
		const user = userEvent.setup()
		const onDelete = jest.fn()

		render(
			<TaskItem
				task={mockTask}
				onToggle={() => {}}
				onDelete={onDelete}
			/>
		)

		await user.click(screen.getByRole("button"))

		expect(onDelete).toHaveBeenCalledTimes(1)
	})

	it("disables controls while toggling", () => {
		render(
			<TaskItem
				task={mockTask}
				onToggle={() => {}}
				onDelete={() => {}}
				isToggling
			/>
		)

		expect(screen.getByRole("checkbox")).toHaveAttribute("aria-disabled", "true")
		expect(screen.getByRole("button")).toBeDisabled()
	})

	it("disables controls while deleting", () => {
		render(
			<TaskItem
				task={mockTask}
				onToggle={() => {}}
				onDelete={() => {}}
				isDeleting
			/>
		)

		expect(screen.getByRole("checkbox")).toHaveAttribute("aria-disabled", "true")
		expect(screen.getByRole("button")).toBeDisabled()
	})
})

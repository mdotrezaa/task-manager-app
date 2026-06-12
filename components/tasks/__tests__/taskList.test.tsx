import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TaskList } from "@/components/tasks/taskList"
import { Task } from "@/types/task"

const mockTasks: Task[] = [
	{ id: 1, title: "Test Task", completed: false }
]

describe("TaskList", () => {
	it("renders tasks", () => {
		render(
			<TaskList
				tasks={mockTasks}
				onToggle={() => {}}
				onDelete={() => {}}
			/>
		)

		expect(screen.getByText("Test Task")).toBeInTheDocument()
	})

	it("shows empty state", () => {
		render(
			<TaskList
				tasks={[]}
				onToggle={() => {}}
				onDelete={() => {}}
			/>
		)

		expect(screen.getByText(/no tasks/i)).toBeInTheDocument()
	})

	it("calls onToggle with task id", async () => {
		const user = userEvent.setup()
		const onToggle = jest.fn()

		render(
			<TaskList
				tasks={mockTasks}
				onToggle={onToggle}
				onDelete={() => {}}
			/>
		)

		await user.click(screen.getByRole("checkbox"))

		expect(onToggle).toHaveBeenCalledWith(1)
	})

	it("calls onDelete with task id", async () => {
		const user = userEvent.setup()
		const onDelete = jest.fn()

		render(
			<TaskList
				tasks={mockTasks}
				onToggle={() => {}}
				onDelete={onDelete}
			/>
		)

		await user.click(screen.getByRole("button"))

		expect(onDelete).toHaveBeenCalledWith(1)
	})
})
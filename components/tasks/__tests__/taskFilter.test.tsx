import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TaskFilter } from "@/components/tasks/taskFilter"

describe("TaskFilter", () => {
	it("renders filter buttons", () => {
		render(
			<TaskFilter
				filter="all"
				setFilter={() => { }}
				setPage={() => { }}
			/>
		)

		expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument()
		expect(screen.getByRole("button", { name: "Pending" })).toBeInTheDocument()
		expect(screen.getByRole("button", { name: "Completed" })).toBeInTheDocument()
	})

	it("calls setFilter and resets page when all is selected", async () => {
		const user = userEvent.setup()
		const setFilter = jest.fn()
		const setPage = jest.fn()

		render(
			<TaskFilter
				filter="pending"
				setFilter={setFilter}
				setPage={setPage}
			/>
		)

		await user.click(screen.getByRole("button", { name: "All" }))

		expect(setFilter).toHaveBeenCalledWith("all")
		expect(setPage).toHaveBeenCalledWith(1)
	})

	it("calls setFilter and resets page when pending is selected", async () => {
		const user = userEvent.setup()
		const setFilter = jest.fn()
		const setPage = jest.fn()

		render(
			<TaskFilter
				filter="all"
				setFilter={setFilter}
				setPage={setPage}
			/>
		)

		await user.click(screen.getByRole("button", { name: "Pending" }))

		expect(setFilter).toHaveBeenCalledWith("pending")
		expect(setPage).toHaveBeenCalledWith(1)
	})

	it("calls setFilter and resets page when completed is selected", async () => {
		const user = userEvent.setup()
		const setFilter = jest.fn()
		const setPage = jest.fn()

		render(
			<TaskFilter
				filter="all"
				setFilter={setFilter}
				setPage={setPage}
			/>
		)

		await user.click(screen.getByRole("button", { name: "Completed" }))

		expect(setFilter).toHaveBeenCalledWith("completed")
		expect(setPage).toHaveBeenCalledWith(1)
	})
})

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as useTasksHook from "@/hooks/useTasks"
import Home from "../page"

// ✅ mock child components (biar fokus ke logic Home)
jest.mock("@/components/tasks/taskForm", () => ({
    TaskForm: () => <div>TaskForm</div>
}))

jest.mock("@/components/tasks/taskList", () => ({
    TaskList: () => <div>TaskList</div>
}))

jest.mock("@/components/tasks/taskFilter", () => ({
    TaskFilter: () => <div>TaskFilter</div>
}))

// ✅ mock lucide icon (optional biar aman)
jest.mock("lucide-react", () => ({
    Loader2: () => <div>Loader</div>
}))

// ✅ helper default mock
const mockUseTasks = (override = {}) => ({
    tasks: [],
    addTask: jest.fn(),
    toggleTask: jest.fn(),
    deleteTask: jest.fn(),
    setFilter: jest.fn(),
    filter: "all",
    loading: false,
    isAdding: false,
    togglingId: null,
    deletingId: null,
    error: null,
    page: 1,
    setPage: jest.fn(),
    totalPages: 1,
    ...override
})

describe("Home Page", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("shows loading state", () => {
        jest.spyOn(useTasksHook, "useTasks").mockReturnValue(
            mockUseTasks({ loading: true }) as any
        )

        render(<Home />)

        expect(screen.getByText("Loading tasks...")).toBeInTheDocument()
    })

    it("shows error state", () => {
        jest.spyOn(useTasksHook, "useTasks").mockReturnValue(
            mockUseTasks({ error: true }) as any
        )

        render(<Home />)

        expect(screen.getByText("Failed to load tasks")).toBeInTheDocument()
    })

    it("renders main content", () => {
        jest.spyOn(useTasksHook, "useTasks").mockReturnValue(
            mockUseTasks() as any
        )

        render(<Home />)

        expect(screen.getByText("Task Manager")).toBeInTheDocument()
        expect(screen.getByText("TaskForm")).toBeInTheDocument()
        expect(screen.getByText("TaskFilter")).toBeInTheDocument()
        expect(screen.getByText("TaskList")).toBeInTheDocument()
    })

    it("does not render pagination when totalPages = 1", () => {
        jest.spyOn(useTasksHook, "useTasks").mockReturnValue(
            mockUseTasks({ totalPages: 1 }) as any
        )

        render(<Home />)

        expect(screen.queryByText("2")).not.toBeInTheDocument()
    })

    it("renders pagination when totalPages > 1", () => {
        jest.spyOn(useTasksHook, "useTasks").mockReturnValue(
            mockUseTasks({ totalPages: 3 }) as any
        )

        render(<Home />)

        expect(screen.getByText("1")).toBeInTheDocument()
        expect(screen.getByText("2")).toBeInTheDocument()
        expect(screen.getByText("3")).toBeInTheDocument()
    })

    it("calls setPage when clicking page button", async () => {
        const user = userEvent.setup()
        const setPage = jest.fn()

        jest.spyOn(useTasksHook, "useTasks").mockReturnValue(
            mockUseTasks({
                totalPages: 3,
                setPage
            }) as any
        )

        render(<Home />)

        await user.click(screen.getByText("2"))

        expect(setPage).toHaveBeenCalledWith(2)
    })

    it("shows ellipsis when page is in the middle", () => {
        jest.spyOn(useTasksHook, "useTasks").mockReturnValue(
            mockUseTasks({
                totalPages: 10,
                page: 5
            }) as any
        )

        render(<Home />)

        expect(screen.getAllByText("...").length).toBeGreaterThan(0)
    })

    it("shows first pages when page is near start", () => {
        jest.spyOn(useTasksHook, "useTasks").mockReturnValue(
            mockUseTasks({
                totalPages: 10,
                page: 2
            }) as any
        )

        render(<Home />)

        expect(screen.getByText("1")).toBeInTheDocument()
        expect(screen.getByText("2")).toBeInTheDocument()
        expect(screen.getByText("3")).toBeInTheDocument()
    })

    it("shows last pages when page is near end", () => {
        jest.spyOn(useTasksHook, "useTasks").mockReturnValue(
            mockUseTasks({
                totalPages: 10,
                page: 9
            }) as any
        )

        render(<Home />)

        expect(screen.getByText("10")).toBeInTheDocument()
    })

    it("renders all pages when totalPages <= 5", () => {
        jest.spyOn(useTasksHook, "useTasks").mockReturnValue(
            mockUseTasks({
                totalPages: 4
            }) as any
        )

        render(<Home />)

        expect(screen.getByText("1")).toBeInTheDocument()
        expect(screen.getByText("2")).toBeInTheDocument()
        expect(screen.getByText("3")).toBeInTheDocument()
        expect(screen.getByText("4")).toBeInTheDocument()
    })
})
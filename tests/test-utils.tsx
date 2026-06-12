import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false }
		}
	})

export const createWrapper = () => {
	const queryClient = createQueryClient()

	return ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}

export const createWrapperWithClient = () => {
	const queryClient = createQueryClient()

	const wrapper = ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)

	return { queryClient, wrapper }
}
import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryCache = new QueryCache()

export const queryClient = new QueryClient({
  queryCache: queryCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3
    }
  }
})

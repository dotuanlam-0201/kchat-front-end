import { queryClient } from "@/lib/configs/queryClient"

export const reFetchQuery = (key: string) => {
  queryClient.refetchQueries({ queryKey: [key] })
}
import { queryCache } from "@/lib/configs/queryClient"

export const useQueryCache = <T>({
  key,
  initValue
}: {
  key: string,
  initValue: T
}) => {
  const dataCache = queryCache.find({ queryKey: [key] })
  return dataCache?.state.data as T ?? initValue as T
}
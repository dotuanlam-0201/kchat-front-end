import { queryClient } from '@/lib/configs/queryClient'

const useRefetch = () => {
  const refetch = (queryKey: string) => {
    queryClient.invalidateQueries({
      queryKey: [queryKey]
    })
  }
  return { refetch }
}

export default useRefetch

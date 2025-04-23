import { getRooms } from "@/lib/actions/room"
import { useQuery } from "@tanstack/react-query"

const QUERY_ROOMS_KEY = 'QUERY_ROOMS_KEY'

export const useQueryRooms = () => {
  return useQuery({
    queryFn: getRooms,
    queryKey: [QUERY_ROOMS_KEY]
  })
}
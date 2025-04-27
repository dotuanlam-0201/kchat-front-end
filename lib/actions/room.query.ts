import { getRooms } from "@/lib/actions/room"
import { Rooms } from "@/lib/model/room"
import { useQuery } from "@tanstack/react-query"

export const QUERY_ROOMS_KEY = 'QUERY_ROOMS_KEY'

export const useQueryRooms = () => {
  return useQuery({
    queryFn: getRooms,
    queryKey: [QUERY_ROOMS_KEY],
    initialData: new Rooms()
  })
}
import { http } from "@/lib/configs/axios"
import { Rooms } from "@/lib/model/room"
import { CommonResponse } from "@/lib/types"

export const addRoom = (payload: Record<string, string | string[]>) => {
  try {
    return http.post('/rooms/add', payload) as Promise<CommonResponse>
  } catch (error) {
    return new CommonResponse()
  }
}
export const getRooms = () => {
  try {
    return http.get('/rooms') as Promise<Rooms>
  } catch (error) {
    return new Rooms()
  }
}
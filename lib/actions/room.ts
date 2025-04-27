import { http } from "@/lib/configs/axios"
import { Room, Rooms } from "@/lib/model/room"

export const addRoom = async (payload: Record<string, string | string[]>): Promise<Room> => {
  return await http.post('/rooms/add', payload)
}
export const getRooms = async (): Promise<Rooms> => {
  return await http.get('/rooms')
}
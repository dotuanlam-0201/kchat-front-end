import { http } from "@/lib/configs/axios"

export const getMessages = async (roomId?: string) => {
  return await http.get(`/messages/${roomId}`)
}
import { http } from "@/lib/configs/axios"

export const getMessages = async (roomId?: string, query?: Record<string, string | number>) => {
  return await http.get(`/messages/${roomId}`, {
    params: query,
    paramsSerializer: { indexes: false }
  })
}
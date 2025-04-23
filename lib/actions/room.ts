import { http } from "@/lib/configs/axios"
import { CommonResponse } from "@/lib/types"

export const addRoom = async (payload: Record<string, string | string[]>) => {
  try {
    return http.post('/rooms/add', payload) as Promise<CommonResponse>
  } catch (error) {
    return new CommonResponse()
  }
}
import { http } from "@/lib/configs/axios"
import { IResponse } from "@/lib/types"
import { IUser } from "@/lib/types/response/user"

export const handleLogin = (dto: Record<string, string>): Promise<IResponse<{
  accessToken: string,
  refreshToken: string,
}>> => {
  try {
    return http.post("auth/login", dto)
  } catch (error: unknown) {
    throw error
  }
}
export const handleSignup = (dto: Record<string, string>): Promise<IResponse<IUser>> => {
  try {
    return http.post("auth/signup", dto)
  } catch (error: unknown) {
    throw error
  }
}
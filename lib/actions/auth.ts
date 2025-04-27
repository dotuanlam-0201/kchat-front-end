import { http } from "@/lib/configs/axios"
import { IUser } from "@/lib/model/user"
import { IResponse } from "@/lib/types"

export const handleLogin = async (dto: Record<string, string>): Promise<IResponse<{
  accessToken: string,
  refreshToken: string,
}>> => {
  return await http.post("auth/login", dto)
}
export const handleSignup = async (dto: Record<string, string>): Promise<IResponse<IUser>> => {
  return await http.post("auth/signup", dto)
}

import { http } from "@/lib/configs/axios"
import { OnlineUsers, User, Users } from "@/lib/model/user"

export const getUsers = async (): Promise<Users> => {
  return await http.get('/users')
}
export const getMe = async (): Promise<User> => {
  return await http.get('/users/me')
}
export const updateUser = async (dto: Record<string, any>): Promise<User> => {
  return await http.put('/users/update', dto)
}
export const getOnlineUsers = async (): Promise<OnlineUsers> => {
  return await http.get('/users/online')
}
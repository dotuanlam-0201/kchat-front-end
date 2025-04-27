import { http } from "@/lib/configs/axios"
import { User, Users } from "@/lib/model/user"

export const getUsers = async (): Promise<Users> => {
  return await http.get('/users')
}
export const getMe = async (): Promise<User> => {
  return await http.get('/users/me')
}

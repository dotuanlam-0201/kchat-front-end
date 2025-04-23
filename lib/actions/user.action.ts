import { http } from "@/lib/configs/axios"
import { IUser, User, Users } from "@/lib/model/user"
import { IResponse } from "@/lib/types"

export const getUsers = () => {
  try {
    return http.get('/users') as Promise<Users>
  } catch (error) {
    return new Users()
  }
}
export const getMe = () => {
  try {
    return http.get('/users/me') as Promise<IResponse<IUser>>
  } catch (error) {
    return new User()
  }
}

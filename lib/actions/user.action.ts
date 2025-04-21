import { http } from "@/lib/configs/axios"
import { User, Users } from "@/lib/model/user"
import { IResponse } from "@/lib/types"
import { TypePartialUser } from "@/lib/types/response/user"

export const getUsers = () => {
  try {
    return http.get('/user') as Promise<Users>
  } catch (error) {
    return new Users()
  }
}
export const getMe = () => {
  try {
    return http.get('/user/me') as Promise<IResponse<TypePartialUser>>
  } catch (error) {
    return new User()
  }
}

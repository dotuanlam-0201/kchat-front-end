import { getMe, getUsers } from "@/lib/actions/user"
import { User, Users } from "@/lib/model/user"
import { useQuery } from "@tanstack/react-query"

export const QUERY_ME_KEY = "QUERY_ME_KEY"

export const useQueryMe = () => {
  return useQuery({
    queryKey: [QUERY_ME_KEY],
    queryFn: getMe,
    initialData: new User()
  })
}

export const useQueryUsers = () => {
  return useQuery({
    queryFn: getUsers,
    queryKey: [],
    initialData: new Users(),
  })
}
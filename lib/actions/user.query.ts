import { getMe, getOnlineUsers, getUsers } from "@/lib/actions/user"
import { OnlineUsers, User, Users } from "@/lib/model/user"
import { useQuery } from "@tanstack/react-query"

export const QUERY_ME_KEY = "QUERY_ME_KEY"

export const QUERY_KEY_USERS = 'QUERY_KEY_USERS'
export const QUERY_KEY_ONLINE_USERS = 'QUERY_KEY_ONLINE_USERS'

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
    queryKey: [QUERY_KEY_USERS],
    initialData: new Users(),
  })
}

export const useQueryOnlineUsers = () => {
  return useQuery({
    queryFn: getOnlineUsers,
    queryKey: [QUERY_KEY_ONLINE_USERS],
    initialData: new OnlineUsers()
  })
}
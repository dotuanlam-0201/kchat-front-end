import { useQueryCache } from '@/hooks/useQueryCache'
import useSocketServerSide from '@/hooks/useSocketServerSide'
import { QUERY_ME_KEY } from '@/lib/actions/user.query'
import { IRoom } from '@/lib/model/room'
import { User } from '@/lib/model/user'

const useLastMessage = ({
  room
}: {
  room: IRoom
}) => {
  const { data } = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User()
  })
  const { lastMessage: lastMessageSocket } = useSocketServerSide()
  const lastMessage = lastMessageSocket.roomId === room._id ? lastMessageSocket : room.lastMessage
  const isNewMessage = lastMessageSocket.roomId === room._id && lastMessageSocket.author?._id !== data._id

  return { lastMessage, isNewMessage }
}

export default useLastMessage

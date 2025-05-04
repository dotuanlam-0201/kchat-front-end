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
  const { lastMessageFromSocket } = useSocketServerSide()
  const lastMessage = lastMessageFromSocket.roomId === room._id ? lastMessageFromSocket : room.lastMessage
  const isNewMessage = lastMessageFromSocket.roomId === room._id && lastMessageFromSocket.author?._id !== data._id
  return { lastMessage, isNewMessage }
}

export default useLastMessage

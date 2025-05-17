import { useQueryCache } from '@/hooks/useQueryCache'
import { useSocket } from '@/hooks/useSocket'
import { QUERY_ME_KEY } from '@/lib/actions/user.query'
import { ILastMessage, IMessage } from '@/lib/model/message'
import { IRoom } from '@/lib/model/room'
import { User } from '@/lib/model/user'
import { useRoomStore } from '@/zustand/store'
import { useEffect, useState } from 'react'

const useLastMessage = ({
  room
}: {
  room: IRoom
}) => {
  const { selectedRoom } = useRoomStore()
  const { socket } = useSocket()
  const { data } = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User()
  })
  const [lastMessageSocket, setLastMessageSocket] = useState({} as ILastMessage)

  const lastMessage = lastMessageSocket.roomId === room._id ? lastMessageSocket : room.lastMessage
  const isNewMessage = lastMessageSocket.roomId === room._id && lastMessageSocket.author?._id !== data._id

  useEffect(() => {
    socket.on('updateLastMessage', (msg: IMessage) => {
      setLastMessageSocket(msg)
    })
    return () => {
      socket.off('updateLastMessage')
    }
  }, [])
  return { lastMessage, isNewMessage }
}

export default useLastMessage

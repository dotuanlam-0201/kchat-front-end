import { useQueryCache } from '@/hooks/useQueryCache'
import { useSocket } from '@/hooks/useSocket'
import { useQueryMessages } from '@/lib/actions/message.query'
import { QUERY_ME_KEY } from '@/lib/actions/user.query'
import { ILastMessage, IMessage } from '@/lib/model/message'
import { User } from '@/lib/model/user'
import { useRoomStore } from '@/zustand/store'
import { first, isArray, isEqual } from 'lodash'
import { useEffect, useState } from 'react'

const useSocketServerSide = () => {
  const { socket, isConnected } = useSocket()
  const { selectedRoom } = useRoomStore()
  const {
    data: { data },
  } = useQueryMessages(selectedRoom._id)
  const { data: currentUser } = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User()
  })

  useEffect(() => {
    if (isArray(data)) setMessages(data)
  }, [JSON.stringify(data)])

  const [messages, setMessages] = useState([] as Array<IMessage>)
  const [lastMessage, setLastMessage] = useState({} as ILastMessage)

  const isNewMessage = (msg: IMessage) => !isEqual(msg.author?._id, currentUser._id)

  useEffect(() => {
    socket.on("getMessages", (msg: IMessage) => {
      setMessages((prev) => [...prev, msg])
    })
    socket.on('updateLastMessage', (msg: IMessage) => {
      setLastMessage(msg)
    })
    socket.on('updateLastMessageWithReaction', (msg: IMessage) => {
      setLastMessage({
        ...msg, ... {
          text: `${msg.author?.displayName ?? msg.author?.email} reacted ${first(msg.reactions)} to message: ${msg.text}`,
          isNewMessage: isNewMessage(msg)
        }
      } as ILastMessage)
    })
    return () => {
      socket.off('updateLastMessage')
      socket.off('getMessages')
    }
  }, [])

  return {
    messages,
    lastMessage,
  }
}

export default useSocketServerSide

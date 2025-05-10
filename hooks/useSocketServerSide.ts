import { useSocket } from '@/hooks/useSocket'
import { useQueryMessages } from '@/lib/actions/message.query'
import { ILastMessage, IMessage } from '@/lib/model/message'
import { useRoomStore } from '@/zustand/store'
import { isArray } from 'lodash'
import { useEffect, useState } from 'react'

const useSocketServerSide = () => {
  const { socket, isConnected } = useSocket()
  const { selectedRoom } = useRoomStore()
  const {
    data: { data },
  } = useQueryMessages(selectedRoom._id)

  useEffect(() => {
    if (isArray(data)) setMessages(data)
  }, [JSON.stringify(data)])

  const [messages, setMessages] = useState([] as Array<IMessage>)
  const [lastMessage, setLastMessage] = useState({} as ILastMessage)

  useEffect(() => {
    socket.on("getMessages", (msg: IMessage) => {
      if (msg.roomId === selectedRoom._id) setMessages((prev) => [...prev, msg])
    })
    socket.on('updateLastMessage', (msg: IMessage) => {
      setLastMessage(msg)
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

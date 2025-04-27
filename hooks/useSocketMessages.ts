import { useSocket } from '@/hooks/useSocket'
import { useQueryMessages } from '@/lib/actions/message.query'
import { IMessage } from '@/lib/model/message'
import { useRoomStore } from '@/zustand/store'
import { isArray } from 'lodash'
import { useEffect, useState } from 'react'

const useSocketMessages = () => {
  const { socket, isConnected } = useSocket()
  const { selectedRoom } = useRoomStore()
  const {
    data: { data },
  } = useQueryMessages(selectedRoom._id)

  useEffect(() => {
    if (isArray(data)) setMessages(data)
  }, [JSON.stringify(data)])

  const [messages, setMessages] = useState([] as Array<IMessage>)

  useEffect(() => {
    socket.on("getMessages", (msg: IMessage) => {
      setMessages((prev) => [...prev, msg])
    })
    return () => {
      socket.off('getLastMessage')
    }
  }, [])

  return {
    messages,
  }
}

export default useSocketMessages

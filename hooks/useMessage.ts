import { useSocket } from '@/hooks/useSocket'
import { useQueryMessages } from '@/lib/actions/message.query'
import { IMessage } from '@/lib/model/message'
import { useRoomStore } from '@/zustand/store'
import { isArray } from 'lodash'
import { useEffect, useState } from 'react'

const useMessage = () => {
  const { socket, isConnected } = useSocket()
  const [limit, setLimit] = useState(50)
  const { selectedRoom, } = useRoomStore()
  const {
    data: { data },
    isFetched,
    isFetching,
  } = useQueryMessages(selectedRoom._id, {
    limit: limit
  })

  useEffect(() => {
    if (isArray(data) && isFetched) setMessages(data)
  }, [JSON.stringify(data)])

  const [messages, setMessages] = useState([] as Array<IMessage>)

  useEffect(() => {
    socket.on("getMessages", (msg: IMessage) => {
      if (msg.roomId === selectedRoom._id) {
        setMessages((prev) => [...prev, msg])
      }
    })
    return () => {
      socket.off('getMessages')
    }
  }, [])

  return {
    messages,
    limit, setLimit,
    isFetched,
    isFetching,

  }
}

export default useMessage

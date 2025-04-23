import Message from "@/components/Message"
import { useSocket } from "@/hooks/useSocket"
import { useEffect } from "react"

const MessageViewContent = () => {
  const { socket, isConnected } = useSocket()
  useEffect(() => {
    socket.on("getMessages", (msg: string) => {})
    return () => {
      socket.off("getMessages")
    }
  }, [])

  return (
    <div className={"space-y-4 flex-1 flex flex-col pt-8 pb-10"}>
      <Message isMe />
      <Message isMe={false} />
      <Message isMe={false} />
    </div>
  )
}

export default MessageViewContent

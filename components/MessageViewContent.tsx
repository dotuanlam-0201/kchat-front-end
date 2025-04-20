import Message from "@/components/Message"
import { useSocket } from "@/hooks/useSocket"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const MessageViewContent = () => {
  const { socket, isConnected } = useSocket()
  const { id } = useParams()
  useEffect(() => {
    socket.on("getMessages", (msg) => {
      alert(`${id}: ${msg}`)
    })
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

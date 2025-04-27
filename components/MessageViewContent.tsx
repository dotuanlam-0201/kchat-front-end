import Message from "@/components/Message"
import useSocketMessages from "@/hooks/useSocketMessages"
import { IMessage } from "@/lib/model/message"

const MessageViewContent = () => {
  const { messages } = useSocketMessages()

  return (
    <div className={"space-y-4 flex-1 flex flex-col pt-8 pb-10"}>
      {messages.map((message: IMessage, i) => (
        <Message key={`${message.roomId}-${i}`} message={message} />
      ))}
    </div>
  )
}

export default MessageViewContent

import Message from "@/components/Message"

const MessageViewContent = () => {
  return (
    <div className={"flex-1 space-y-4 flex flex-col pt-8 pb-20"}>
      <Message isMe={false} />
      <Message isMe />
      <Message isMe={false} />
      <Message isMe />
      <Message isMe={false} />
      <Message isMe />
      <Message isMe={false} />
      <Message isMe />
      <Message isMe={false} />
      <Message isMe />
    </div>
  )
}

export default MessageViewContent

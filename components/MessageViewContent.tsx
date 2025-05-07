import Message from "@/components/Message"
import { Badge } from "@/components/ui/badge"
import useSocketServerSide from "@/hooks/useSocketServerSide"
import dayjs from "@/lib/functions/dayjs"
import { IMessage } from "@/lib/model/message"
import { Fragment } from "react"

const MessageViewContent = () => {
  const { messages } = useSocketServerSide()

  const handleRenderDaySeparator = (message: IMessage, i: number) => {
    const currentDate = dayjs(message.createdAt).format("YYYY-MM-DD")
    const prevDate =
      i > 0 ? dayjs(messages[i - 1].createdAt).format("YYYY-MM-DD") : null
    return currentDate !== prevDate
  }

  return (
    <div className={"space-y-4 flex-1 flex flex-col pt-8 pb-10"}>
      {messages.map((message: IMessage, i) => {
        const isRenderDaySeparator = handleRenderDaySeparator(message, i)
        return (
          <Fragment key={`${message.roomId}-${i}`}>
            <MessageDaySeparator
              isRender={isRenderDaySeparator}
              message={message}
            />
            <Message message={message} />
          </Fragment>
        )
      })}
    </div>
  )
}

export default MessageViewContent

const MessageDaySeparator = ({
  message,
  isRender,
}: {
  message: IMessage
  isRender: boolean
}) => {
  return (
    isRender && (
      <div className="text-center sticky top-1/9">
        <Badge className="text-center bg-muted text-[10px] text-muted-foreground">
          {dayjs(message.createdAt).format("DD, MMM YYYY")}
        </Badge>
      </div>
    )
  )
}

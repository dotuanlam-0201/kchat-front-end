import FetchMoreMessageListener from "@/components/FetchMoreMessageListener"
import LoadingMoreMessage from "@/components/LoadingMoreMessage"
import Message from "@/components/Message"
import { Badge } from "@/components/ui/badge"
import useMessage from "@/hooks/useMessage"
import dayjs from "@/lib/functions/dayjs"
import { IMessage } from "@/lib/model/message"
import { useScrollStore } from "@/zustand/store"
import { Fragment } from "react"

const MessageViewContent = () => {
  const { messages, setLimit, isFetched, isFetching } = useMessage()
  const { disableAutoScroll } = useScrollStore()
  const handleFetchMoreMessage = () => {
    disableAutoScroll()
    setLimit((prev) => prev + 50)
  }

  const handleRenderDaySeparator = (message: IMessage, i: number) => {
    const currentDate = dayjs(message.createdAt).format("YYYY-MM-DD")
    const prevDate =
      i > 0 ? dayjs(messages[i - 1].createdAt).format("YYYY-MM-DD") : null
    return currentDate !== prevDate
  }

  return (
    <div className={"space-y-4 flex-1 flex flex-col pt-8 pb-20"}>
      <LoadingMoreMessage isFetching={isFetching} />
      <FetchMoreMessageListener
        enabled={isFetched}
        callback={handleFetchMoreMessage}
      />
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

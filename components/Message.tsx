import MessageFile from "@/components/MessageFile"
import { useQueryCache } from "@/hooks/useQueryCache"
import { QUERY_ME_KEY } from "@/lib/actions/user.query"
import { cn } from "@/lib/functions/cn"
import dayjs from "@/lib/functions/dayjs"
import { IMessage } from "@/lib/model/message"
import { User } from "@/lib/model/user"
import { isEqual } from "lodash"
import { ReactNode } from "react"
interface IMessageProps {
  message: IMessage
}

const Message = ({ message }: IMessageProps) => {
  const currentUser = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User(),
  })
  const isMe = isEqual(currentUser.data._id, message?.author?._id)
  return (
    <MessageContainer isMe={isMe}>
      <div
        className={cn(
          "flex gap-2 transition-all max-w-full lg:max-w-8/12 rounded-sm w-fit",
          {
            "flex-row-reverse": isMe,
          }
        )}
      >
        <article
          className={cn(
            "rounded-sm backdrop-blur-3xl bg-muted space-y-2 shadow-xl p-2",
            {
              "bg-primary-foreground": isMe,
              "bg-transparent": Boolean(message.fileURL),
            }
          )}
        >
          <MessageFile message={message} />

          <p className="break-words text-sm">{message.text}</p>

          <footer
            className={cn("flex relative gap-1 items-center text-xs", {
              "text-end": !isMe,
              "text-start": isMe,
            })}
          >
            <span className="text-muted-foreground text-[10px]">
              {dayjs(message.createdAt).format("HH:mm")}
            </span>
            {/* <MessageEmotion message={message} reactions={message.reactions} /> */}
          </footer>
        </article>
      </div>
    </MessageContainer>
  )
}

export default Message

const MessageContainer = ({
  children,
  isMe,
}: {
  children?: ReactNode
  isMe?: boolean
}) => {
  return (
    <div
      className={cn("flex group", {
        "justify-end": isMe,
      })}
    >
      {children}
    </div>
  )
}

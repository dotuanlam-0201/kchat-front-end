import MessageEmotion from "@/components/MessageEmotion"
import MessageSeenMarker from "@/components/MessageSeenMarker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQueryCache } from "@/hooks/useQueryCache"
import { QUERY_ME_KEY } from "@/lib/actions/user.query"
import { cn } from "@/lib/functions/cn"
import getFallbackAvatar from "@/lib/functions/getFallbackAvatar"
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
        <Avatar className="size-10">
          <AvatarFallback>{getFallbackAvatar("Do Tuan Lam")}</AvatarFallback>
          <AvatarImage src={message?.author?.avatarURL} />
        </Avatar>

        <article
          className={cn(
            "rounded-sm backdrop-blur-3xl bg-muted space-y-2 shadow-xl p-2",
            {
              "bg-primary-foreground": isMe,
            }
          )}
        >
          <p className="break-words text-sm">{message.text}</p>

          <footer
            className={cn("flex relative gap-1 items-center text-xs", {
              "text-end": !isMe,
              "text-start": isMe,
            })}
          >
            <span className="text-muted-foreground">16:04</span>
            <MessageSeenMarker isSeen />
            <MessageSeenMarker isSeen={false} />
            <MessageEmotion />
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
      className={cn("flex", {
        "justify-end": isMe,
      })}
    >
      {children}
    </div>
  )
}

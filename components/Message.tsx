interface IMessageProps {
  isMe: boolean
}

const Message = ({ isMe }: IMessageProps) => {
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
          <AvatarImage />
        </Avatar>

        <article
          className={cn(
            "rounded-sm backdrop-blur-3xl bg-muted space-y-2 shadow-xl p-2",
            {
              "bg-primary-foreground": isMe,
            }
          )}
        >
          <p className="break-words text-sm">
            The most used version of Lorem Ipsum? « Lorem ipsum dolor sit amet,
            consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
            exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
            ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. »
          </p>

          <footer
            className={cn("flex relative gap-1 items-center text-xs", {
              "text-end": !isMe,
              "text-start": isMe,
            })}
          >
            <span className="text-muted-foreground">16:04</span>
            <MessageSeenMarker isSeen />
            <MessageEmotion />
          </footer>
        </article>
      </div>
    </MessageContainer>
  )
}

export default Message

import MessageEmotion from "@/components/MessageEmotion"
import MessageSeenMarker from "@/components/MessageSeenMarker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getFallbackAvatar from "@/lib/getFallbackAvatar"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

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

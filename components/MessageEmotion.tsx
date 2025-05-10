"use client"

import { Dock, DockIcon } from "@/components/magicui/dock"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQueryCache } from "@/hooks/useQueryCache"
import { useSocket } from "@/hooks/useSocket"
import { QUERY_ME_KEY } from "@/lib/actions/user.query"
import { cn } from "@/lib/functions/cn"
import { IMessage, IMessagePayload } from "@/lib/model/message"
import { User } from "@/lib/model/user"
import Picker from "@emoji-mart/react"
import { FaceIcon, PlusIcon } from "@radix-ui/react-icons"
import { concat, first, get, isArray, map } from "lodash"
import { useTheme } from "next-themes"
import { useState } from "react"

const MessageEmotion = ({
  reactions,
  message,
}: {
  reactions?: string[]
  message: IMessage
}) => {
  const { socket } = useSocket()
  const { theme } = useTheme()
  const [isDefault, setIsDefault] = useState(true)
  const [selected, setSelected] = useState(first(reactions))
  const [visiblePopup, setVisiblePopup] = useState(false)
  const popularEmojis = ["😂", "❤️", "😍", "🤣", "🙏"]
  const { data } = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User(),
  })

  const handleSelectEmoji = (emoji: string) => {
    const payloadSocket = {
      ...message,
      ...{
        reactions: isArray(message.reactions)
          ? concat(message.reactions, [emoji])
          : [emoji],
      },
      author: data._id,
    } as IMessagePayload
    socket.emit("reactMessage", payloadSocket)
    setSelected(emoji)
    setVisiblePopup(false)
  }

  const renderContent = () => {
    if (isDefault)
      return (
        <Dock direction="middle">
          {map(popularEmojis, (emoji, i) => (
            <DockIcon key={i}>
              <Button
                onClick={() => handleSelectEmoji(emoji)}
                size={"sm"}
                variant={"ghost"}
                className="rounded-full hover:scale-150 duration-300 size-10 text-2xl"
              >
                {emoji}
              </Button>
            </DockIcon>
          ))}
          <DockIcon>
            <Button
              onClick={() => setIsDefault(false)}
              size={"sm"}
              className="rounded-full text-xl"
              variant={"secondary"}
            >
              <PlusIcon />
            </Button>
          </DockIcon>
        </Dock>
      )
    return (
      <Picker
        selected={selected}
        theme={theme}
        data={data}
        onEmojiSelect={(e: any) => handleSelectEmoji(get(e, "native", ""))}
      />
    )
  }

  return (
    <Popover
      open={visiblePopup}
      onOpenChange={(open: boolean) => {
        setVisiblePopup(open)
        setTimeout(() => {
          setIsDefault(true)
        }, 100)
      }}
    >
      <PopoverTrigger>
        <span
          className={cn(
            "text-lg bg-muted text-muted-foreground cursor-pointer w-fit h-fit size-7 rounded-full bottom-[-20px] right-[-20px] absolute hidden justify-center items-center group-hover:flex",
            {
              flex: Boolean(selected),
            }
          )}
        >
          {selected ?? <FaceIcon />}
        </span>
      </PopoverTrigger>

      <PopoverContent
        sticky="always"
        sideOffset={-20}
        side="bottom"
        className="p-0 border-none w-fit"
      >
        {renderContent()}
      </PopoverContent>
    </Popover>
  )
}

export default MessageEmotion

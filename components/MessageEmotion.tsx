import { Dock, DockIcon } from "@/components/magicui/dock"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/functions/cn"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { FaceIcon, PlusIcon } from "@radix-ui/react-icons"
import { first, get, map } from "lodash"
import { useTheme } from "next-themes"
import { useState } from "react"

const MessageEmotion = ({
  reactions,
  open,
}: {
  reactions?: string[]
  open: boolean
}) => {
  const { theme } = useTheme()
  const [isDefault, setIsDefault] = useState(true)
  const [selected, setSelected] = useState(first(reactions))
  const [visiblePopup, setVisiblePopup] = useState(open)
  const popularEmojis = ["😂", "❤️", "😍", "🤣", "🙏"]

  const handleSelectEmoji = (emoji: string) => {
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
      <PopoverTrigger asChild>
        <span
          className={cn(
            "text-lg bg-muted text-muted-foreground cursor-pointer w-fit h-fit size-7 rounded-full bottom-[-20px] right-[-20px] absolute hidden justify-center items-center",
            {
              flex: open,
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

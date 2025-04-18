import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { FaceIcon, PlusIcon } from "@radix-ui/react-icons"
import { map } from "lodash"
import { useTheme } from "next-themes"
import { useState } from "react"
const MessageEmotion = ({ emotion }: { emotion?: string }) => {
  const { theme } = useTheme()
  const [isDefault, setIsDefault] = useState(true)
  const popularEmojis = ["😂", "❤️", "😍", "🤣", "🙏"]

  const renderContent = () => {
    if (isDefault)
      return (
        <div className="flex items-center">
          {map(popularEmojis, (emoji, i) => (
            <Button
              key={i}
              size={"sm"}
              className="rounded-full hover:scale-110 size-10 text-xl"
              variant={"ghost"}
            >
              {emoji}
            </Button>
          ))}
          <Button
            onClick={() => setIsDefault(false)}
            size={"sm"}
            className="rounded-full text-xl"
            variant={"secondary"}
          >
            <PlusIcon />
          </Button>
        </div>
      )
    return <Picker theme={theme} data={data} onEmojiSelect={console.log} />
  }

  return (
    <Popover
      onOpenChange={() =>
        setTimeout(() => {
          setIsDefault(true)
        }, 100)
      }
    >
      <PopoverTrigger asChild>
        <span className="text-lg cursor-pointer flex justify-center items-center bg-muted size-7 rounded-full bottom-[-20px] left-[-20px] absolute">
          {emotion ?? <FaceIcon />}
        </span>
      </PopoverTrigger>
      <PopoverContent className="p-0 transition-all w-fit">
        {renderContent()}
      </PopoverContent>
    </Popover>
  )
}

export default MessageEmotion

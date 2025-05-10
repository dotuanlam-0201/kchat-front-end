"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Picker from "@emoji-mart/react"
import { FaceIcon } from "@radix-ui/react-icons"
import { get } from "lodash"
import { useTheme } from "next-themes"

const PopupEmojiPicker = ({
  handleSelectEmoji,
}: {
  handleSelectEmoji: (e: string) => void
}) => {
  const { theme } = useTheme()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="rounded-full border z-1 transition-all size-6 sm:size-10 right-2 absolute"
          variant={"secondary"}
        >
          <FaceIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Picker
          theme={theme}
          onEmojiSelect={(e: any) => handleSelectEmoji(get(e, "native", ""))}
        />
      </PopoverContent>
    </Popover>
  )
}

export default PopupEmojiPicker

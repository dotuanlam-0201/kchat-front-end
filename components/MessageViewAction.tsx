"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSidebar } from "@/components/ui/sidebar"
import { useSocket } from "@/hooks/useSocket"
import { cn } from "@/lib/utils"
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid"

const MessageViewAction = () => {
  const { isMobile, toggleSidebar } = useSidebar()
  const {} = useSocket()

  return (
    <footer className="sticky gap-3 flex items-center bottom-4">
      <Button
        onClick={toggleSidebar}
        aria-label="Attach file"
        title="Attach file"
        className={cn(
          "rounded-full hidden border z-1 transition-all size-6 sm:size-10",
          {
            "inline-flex": isMobile,
          }
        )}
      >
        <ChatBubbleLeftRightIcon className="size-3 sm:size-4" />
      </Button>
      <div className="relative flex items-center w-full">
        <Button
          aria-label="Attach file"
          title="Attach file"
          variant={"secondary"}
          className="rounded-full border z-1 transition-all size-6 sm:size-10 left-2 absolute"
        >
          <PhotoIcon className="size-3 sm:size-4" />
        </Button>
        <Input
          placeholder="Type Message..."
          className="w-full backdrop-blur-3xl pl-10 sm:pl-14 shrink-1 sm:h-13 rounded-full"
        />
        <Button className="rounded-full z-1 transition-all size-6 sm:size-10 right-2 absolute">
          <PaperAirplaneIcon className="size-3 sm:size-4" />
        </Button>
      </div>
    </footer>
  )
}

export default MessageViewAction

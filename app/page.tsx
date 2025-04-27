"use client"

import { Icon } from "@/components/icons"
import MainLayoutWithSidebar from "@/components/MainLayoutWithSidebar"
import MessageView from "@/components/MessageView"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { useQueryMe } from "@/lib/actions/user.query"
import { cn } from "@/lib/functions/cn"
import { useRoomStore } from "@/zustand/store"
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid"

export default function Home() {
  const { isMobile, toggleSidebar } = useSidebar()
  const { selectedRoom } = useRoomStore()
  useQueryMe()
  const renderWithoutRoom = () => {
    return (
      <article className="space-y-4 flex flex-col">
        <Icon.HomePageLogo className="max-w-36 max-h-30" />
        <h1 className="text-muted-foreground">KChat Web</h1>
        <span className="text-muted-foreground">
          Send and receive message without your phone!
        </span>
        <Button
          className="flex sm:hidden"
          onClick={toggleSidebar}
          variant={"secondary"}
          size={"lg"}
        >
          <ChatBubbleBottomCenterIcon /> Start Conversation
        </Button>
      </article>
    )
  }
  return (
    <MainLayoutWithSidebar>
      <div
        className={cn(
          "pl-[var(--sidebar-width)] grid place-items-center relative h-full transition-all",
          {
            "pl-0": isMobile,
          }
        )}
      >
        {selectedRoom._id ? <MessageView /> : renderWithoutRoom()}
      </div>
    </MainLayoutWithSidebar>
  )
}

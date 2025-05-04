"use client"

import MainLayoutWithSidebar from "@/components/MainLayoutWithSidebar"
import MessageView from "@/components/MessageView"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { useQueryMe } from "@/lib/actions/user.query"
import { cn } from "@/lib/functions/cn"
import HomeLottie from "@/lottie/home.json"
import { useRoomStore } from "@/zustand/store"
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid"
import Lottie from "lottie-react"

export default function Home() {
  const { isMobile, toggleSidebar } = useSidebar()
  const { selectedRoom } = useRoomStore()
  useQueryMe()
  const renderWithoutRoom = () => {
    return (
      <article className="space-y-4 p-5 flex flex-col">
        <Lottie animationData={HomeLottie} loop={true} />
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

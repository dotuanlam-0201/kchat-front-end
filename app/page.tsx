"use client"

import HomePageWithoutMessage from "@/components/HomePageWithoutMessage"
import MainLayoutWithSidebar from "@/components/MainLayoutWithSidebar"
import MessageView from "@/components/MessageView"
import { useSidebar } from "@/components/ui/sidebar"
import { useQueryMe } from "@/lib/actions/user.query"
import { cn } from "@/lib/functions/cn"
import { useRoomStore } from "@/zustand/store"

export default function Home() {
  const { isMobile } = useSidebar()
  const { selectedRoom } = useRoomStore()
  useQueryMe()
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
        {selectedRoom._id ? <MessageView /> : <HomePageWithoutMessage />}
      </div>
    </MainLayoutWithSidebar>
  )
}

"use client"

import MainLayoutWithSidebar from "@/components/MainLayoutWithSidebar"
import MessageView from "@/components/MessageView"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const MassageDetail = () => {
  const { isMobile } = useSidebar()

  return (
    <MainLayoutWithSidebar>
      <div
        className={cn(
          "pl-[var(--sidebar-width)] relative h-full transition-all",
          {
            "pl-0": isMobile,
          }
        )}
      >
        <MessageView />
      </div>
    </MainLayoutWithSidebar>
  )
}

export default MassageDetail

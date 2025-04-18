"use client"

import MessageView from "@/components/MessageView"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const MassageDetail = () => {
  const { isMobile } = useSidebar()

  return (
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
  )
}

export default MassageDetail

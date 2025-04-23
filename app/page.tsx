"use client"

import { Icon } from "@/components/icons"
import MainLayoutWithSidebar from "@/components/MainLayoutWithSidebar"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/functions/cn"
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid"

export default function Home() {
  const { isMobile, toggleSidebar } = useSidebar()
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
        <article className="space-y-4 flex flex-col">
          <Icon.HomePageLogo className="max-w-36" />
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
      </div>
    </MainLayoutWithSidebar>
  )
}

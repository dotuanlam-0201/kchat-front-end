"use client"

import { Icon } from "@/components/icons"
import MainLayoutWithSidebar from "@/components/MainLayoutWithSidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export default function Home() {
  const { isMobile } = useSidebar()
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
        <article className="space-y-4">
          <Icon.HomePageLogo className="max-w-36" />
          <h1 className="text-muted-foreground">KChat Web</h1>
          <span className="text-muted-foreground">
            Send and receive message without your phone!
          </span>
        </article>
      </div>
    </MainLayoutWithSidebar>
  )
}

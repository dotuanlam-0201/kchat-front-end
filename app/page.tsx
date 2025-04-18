"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export default function Home() {
  const { isMobile } = useSidebar()
  return (
    <div
      className={cn(
        "pl-[var(--sidebar-width)] grid place-items-center relative h-full transition-all",
        {
          "pl-0": isMobile,
        }
      )}
    >
      <article className="space-y-4">
        <h2 className="text-muted-foreground">KChat Web</h2>
        <span className="text-muted-foreground">
          Send and receive message without your phone!
        </span>
      </article>
    </div>
  )
}

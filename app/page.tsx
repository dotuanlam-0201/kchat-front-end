"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Bars4Icon } from "@heroicons/react/16/solid"

export default function Home() {
  const { open, toggleSidebar } = useSidebar()
  return (
    <div
      className={cn("ml-[var(--sidebar-width)] transition-all", {
        "ml-0": !open,
      })}
    >
      <Button variant={"ghost"} onClick={toggleSidebar}>
        <Bars4Icon />
      </Button>
    </div>
  )
}

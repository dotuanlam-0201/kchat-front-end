"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import HomeLottie from "@/lottie/home.json"
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid"
import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const HomePageWithoutMessage = () => {
  const { toggleSidebar } = useSidebar()

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

export default HomePageWithoutMessage

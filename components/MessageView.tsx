"use client"

import MessageViewAction from "@/components/MessageViewAction"
import MessageViewContent from "@/components/MessageViewContent"
import MessageViewHeader from "@/components/MessageViewHeader"
import useScrollToBottom from "@/hooks/useScrollToBottom"
import { cn } from "@/lib/utils"
import { DragEvent, useRef, useState } from "react"

const MessageView = () => {
  const dragCounter = useRef(0)
  const [isOverlay, setIsOverlay] = useState(false)
  const [ref] = useScrollToBottom()

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragCounter.current++
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setIsOverlay(false)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    setIsOverlay(true)
    e.preventDefault()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOverlay(false)
    dragCounter.current = 0
  }

  return (
    <section
      ref={ref}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={"h-full flex relative p-4 border-l-1 w-full flex-col bg-cover"}
    >
      <Overlay isOverlay={isOverlay} />
      <MessageViewHeader />
      <MessageViewContent />
      <MessageViewAction />
    </section>
  )
}

export default MessageView

const Overlay = ({ isOverlay }: { isOverlay: boolean }) => (
  <div
    className={cn(
      "absolute bottom-1/2 grid place-items-center inset-0 z-100 bg-gray-950 opacity-90",
      {
        hidden: !isOverlay,
        "cursor-grabbing": isOverlay,
      }
    )}
  ></div>
)

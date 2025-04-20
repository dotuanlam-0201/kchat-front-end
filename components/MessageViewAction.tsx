"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSidebar } from "@/components/ui/sidebar"
import { useSocket } from "@/hooks/useSocket"
import { messageSchema } from "@/lib/types/zodSchema"
import { cn } from "@/lib/utils"
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { trim } from "lodash"
import { useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const MessageViewAction = () => {
  const { id } = useParams()
  const { isMobile, toggleSidebar } = useSidebar()
  const { socket } = useSocket()
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  const onSendMessage = (values: z.infer<typeof messageSchema>) => {
    const { message } = values
    if (!trim(message)) return
    socket.emit("sendMessage", {
      roomId: id as string,
      message: message,
    })
    form.reset()
  }

  const onKeyDown = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key && e.key === "Enter") {
      form.handleSubmit(onSendMessage)()
    }
  }

  return (
    <footer className="sticky gap-3 flex items-center bottom-4">
      <Button
        onClick={toggleSidebar}
        aria-label="Attach file"
        title="Attach file"
        className={cn(
          "rounded-full hidden border z-1 transition-all size-6 sm:size-10",
          {
            "inline-flex": isMobile,
          }
        )}
      >
        <ChatBubbleLeftRightIcon className="size-3 text-white sm:size-4" />
      </Button>
      <div className="relative flex items-center w-full">
        <Button
          aria-label="Attach file"
          title="Attach file"
          variant={"secondary"}
          className="rounded-full border z-1 transition-all size-6 sm:size-10 left-2 absolute"
        >
          <PhotoIcon className="size-3 sm:size-4" />
        </Button>

        <Form {...form}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={onKeyDown}
                    placeholder="Type Message..."
                    className="w-full backdrop-blur-3xl pl-10 sm:pl-14 shrink-1 sm:h-13 rounded-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>

        <Button
          onClick={form.handleSubmit(onSendMessage)}
          className="rounded-full z-1 transition-all size-6 sm:size-10 right-2 absolute"
        >
          <PaperAirplaneIcon className="size-3 text-white sm:size-4" />
        </Button>
      </div>
    </footer>
  )
}

export default MessageViewAction

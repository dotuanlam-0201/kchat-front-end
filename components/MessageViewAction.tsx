"use client"

import FileUploader from "@/components/FileUploader"
import PopupEmojiPicker from "@/components/PopupEmojiPicker"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSidebar } from "@/components/ui/sidebar"
import { useQueryCache } from "@/hooks/useQueryCache"
import { useSocket } from "@/hooks/useSocket"
import { QUERY_ME_KEY } from "@/lib/actions/user.query"
import { uploadFile } from "@/lib/actions/utils"
import { cn } from "@/lib/functions/cn"
import { User } from "@/lib/model/user"
import { messageSchema } from "@/lib/types/zodSchema"
import { useRoomStore, useScrollStore } from "@/zustand/store"
import {
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { trim } from "lodash"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

const MessageViewAction = () => {
  const { theme } = useTheme()
  const { isMobile, toggleSidebar } = useSidebar()
  const { socket } = useSocket()
  const { isPending, mutateAsync, isError } = useMutation({
    mutationFn: uploadFile,
  })
  const { enableAutoScroll } = useScrollStore()

  const currentUser = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User(),
  })
  const { selectedRoom } = useRoomStore()
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
      author: currentUser.data._id,
      roomId: selectedRoom._id,
      text: message,
    })
    form.reset()
    enableAutoScroll()
  }

  const onKeyDown = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key && e.key === "Enter") {
      form.handleSubmit(onSendMessage)()
    }
  }

  const handleSelectEmoji = (e: string) => {
    const currentMsg = form.getValues("message")
    form.setValue("message", currentMsg + e)
  }

  const onFileChange = async (file: File) => {
    try {
      const res = await mutateAsync(file)
      socket.emit("sendMessage", {
        author: currentUser.data._id,
        roomId: selectedRoom._id,
        fileURL: res.data,
        text: "",
      })
    } catch (error: any) {
      toast(error?.message, { type: "error" })
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
        <ChatBubbleLeftRightIcon className="size-3 text-white sm:size-5" />
      </Button>

      <div className="relative gap-3 flex items-center w-full">
        <FileUploader onFileChange={onFileChange}>
          <Button
            aria-label="Attach file"
            title="Attach file"
            variant={"secondary"}
            className="rounded-full border z-1 transition-all size-6 sm:size-10"
          >
            {isPending ? (
              <ArrowPathIcon className="animate-spin" />
            ) : (
              <PhotoIcon className="size-3 sm:size-5" />
            )}
          </Button>
        </FileUploader>

        <PopupEmojiPicker handleSelectEmoji={handleSelectEmoji} />

        <Form {...form}>
          <FormField
            disabled={isPending}
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={onKeyDown}
                    placeholder="Type Message..."
                    className="w-full backdrop-blur-3xl shrink-1 sm:h-13 rounded-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      </div>
    </footer>
  )
}

export default MessageViewAction

"use client"

import Logo from "@/components/icons/Logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { map } from "lodash"
import Link from "next/link"

// Menu items.

const rooms = [
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
  {
    avatarURL: "",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    lastMessageAt: "19:48",
  },
]
const AppSidebar = () => {
  const { isMobile, toggleSidebar } = useSidebar()

  const handleSelectChatRoom = () => {
    if (isMobile) toggleSidebar()
  }

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex items-center gap-4">
            <Logo className="text-primary max-w-40 rounded-full" />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <Input className="rounded-2xl" placeholder="Search..." />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {map(
                rooms,
                ({ avatarURL, lastMessage, lastMessageAt, name }, i) => {
                  const isActive = i === 0
                  return (
                    <Link key={i} href={`/message/${i}`}>
                      <SidebarMenuItem className="h-fit" key={i}>
                        <SidebarMenuButton
                          onClick={handleSelectChatRoom}
                          className={cn(
                            "h-fit rounded-2xl items-center transition-all flex gap-4",
                            {
                              "bg-muted": isActive,
                            }
                          )}
                        >
                          <Avatar className="size-10 sm:size-12">
                            <AvatarImage src={avatarURL} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 flex flex-col gap-2">
                            <span className="font-bold">{name}</span>
                            <span className="text-muted-foreground">
                              {lastMessage}
                            </span>
                          </div>

                          <div className="flex flex-col gap-2">
                            <span className="text-muted-foreground">
                              {lastMessageAt}
                            </span>
                            <Badge className="rounded-full">2</Badge>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  )
                }
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar

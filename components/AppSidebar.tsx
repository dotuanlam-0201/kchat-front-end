"use client"

import { Icon } from "@/components/icons"
import MainSetting from "@/components/MainSetting"
import PopupNewConversation from "@/components/PopupNewConversation"
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
import UserInfo from "@/components/UserInfo"
import { useSocket } from "@/hooks/useSocket"
import { useQueryMe } from "@/lib/actions/user.query"
import { cn } from "@/lib/functions/cn"
import { map } from "lodash"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect } from "react"

// Menu items.
const rooms = [
  {
    roomId: "room-1",
    avatarURL: "https://example.com/avatars/avatar-1.png",
    name: "Room 1",
    lastMessage: "Hello from Room 1!",
    lastMessageAt: "09:30",
  },
  {
    roomId: "room-2",
    avatarURL: "https://example.com/avatars/avatar-2.png",
    name: "Room 2",
    lastMessage: "Hello from Room 2!",
    lastMessageAt: "09:29",
  },
  {
    roomId: "room-3",
    avatarURL: "https://example.com/avatars/avatar-3.png",
    name: "Room 3",
    lastMessage: "Hello from Room 3!",
    lastMessageAt: "09:28",
  },
  {
    roomId: "room-4",
    avatarURL: "https://example.com/avatars/avatar-4.png",
    name: "Room 4",
    lastMessage: "Hello from Room 4!",
    lastMessageAt: "09:27",
  },
  {
    roomId: "room-5",
    avatarURL: "https://example.com/avatars/avatar-5.png",
    name: "Room 5",
    lastMessage: "Hello from Room 5!",
    lastMessageAt: "09:26",
  },
  {
    roomId: "room-6",
    avatarURL: "https://example.com/avatars/avatar-6.png",
    name: "Room 6",
    lastMessage: "Hello from Room 6!",
    lastMessageAt: "09:25",
  },
  {
    roomId: "room-7",
    avatarURL: "https://example.com/avatars/avatar-7.png",
    name: "Room 7",
    lastMessage: "Hello from Room 7!",
    lastMessageAt: "09:24",
  },
  {
    roomId: "room-8",
    avatarURL: "https://example.com/avatars/avatar-8.png",
    name: "Room 8",
    lastMessage: "Hello from Room 8!",
    lastMessageAt: "09:23",
  },
  {
    roomId: "room-9",
    avatarURL: "https://example.com/avatars/avatar-9.png",
    name: "Room 9",
    lastMessage: "Hello from Room 9!",
    lastMessageAt: "09:22",
  },
  {
    roomId: "room-10",
    avatarURL: "https://example.com/avatars/avatar-10.png",
    name: "Room 10",
    lastMessage: "Hello from Room 10!",
    lastMessageAt: "09:21",
  },
  {
    roomId: "room-11",
    avatarURL: "https://example.com/avatars/avatar-11.png",
    name: "Room 11",
    lastMessage: "Hello from Room 11!",
    lastMessageAt: "09:20",
  },
  {
    roomId: "room-12",
    avatarURL: "https://example.com/avatars/avatar-12.png",
    name: "Room 12",
    lastMessage: "Hello from Room 12!",
    lastMessageAt: "09:19",
  },
  {
    roomId: "room-13",
    avatarURL: "https://example.com/avatars/avatar-13.png",
    name: "Room 13",
    lastMessage: "Hello from Room 13!",
    lastMessageAt: "09:18",
  },
  {
    roomId: "room-14",
    avatarURL: "https://example.com/avatars/avatar-14.png",
    name: "Room 14",
    lastMessage: "Hello from Room 14!",
    lastMessageAt: "09:17",
  },
  {
    roomId: "room-15",
    avatarURL: "https://example.com/avatars/avatar-15.png",
    name: "Room 15",
    lastMessage: "Hello from Room 15!",
    lastMessageAt: "09:16",
  },
  {
    roomId: "room-16",
    avatarURL: "https://example.com/avatars/avatar-16.png",
    name: "Room 16",
    lastMessage: "Hello from Room 16!",
    lastMessageAt: "09:15",
  },
  {
    roomId: "room-17",
    avatarURL: "https://example.com/avatars/avatar-17.png",
    name: "Room 17",
    lastMessage: "Hello from Room 17!",
    lastMessageAt: "09:14",
  },
  {
    roomId: "room-18",
    avatarURL: "https://example.com/avatars/avatar-18.png",
    name: "Room 18",
    lastMessage: "Hello from Room 18!",
    lastMessageAt: "09:13",
  },
  {
    roomId: "room-19",
    avatarURL: "https://example.com/avatars/avatar-19.png",
    name: "Room 19",
    lastMessage: "Hello from Room 19!",
    lastMessageAt: "09:12",
  },
  {
    roomId: "room-20",
    avatarURL: "https://example.com/avatars/avatar-20.png",
    name: "Room 20",
    lastMessage: "Hello from Room 20!",
    lastMessageAt: "09:11",
  },
]

const AppSidebar = () => {
  const { socket } = useSocket()
  const {
    data: { data },
  } = useQueryMe()
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <Sidebar className="border-r-1" collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex items-center justify-between gap-4">
            <Icon.AppLogo className="text-primary max-w-30 rounded-full" />

            <nav className="space-x-3">
              <PopupNewConversation />
              <MainSetting />
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <Input className="rounded-2xl" placeholder="Search..." />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {map(rooms, (room, i) => {
                const isActive = i === 0
                return <Room key={i} isActive={isActive} room={room} />
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="sticky backdrop-blur-md rounded-3xl bottom-0">
          <SidebarGroupContent>
            <UserInfo user={data} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar

const Room = ({ room, isActive }: { room: any; isActive: boolean }) => {
  const { id } = useParams()
  const { isMobile, toggleSidebar } = useSidebar()
  const { socket } = useSocket()
  const handleSelectChatRoom = (roomId: string) => {
    if (isMobile) toggleSidebar()
    socket.emit("joinRoom", roomId)
  }

  useEffect(() => {
    if (id) socket.emit("joinRoom", id as string)
  }, [id])

  const { roomId, avatarURL, name, lastMessage, lastMessageAt } = room
  return (
    <Link href={`/message/${roomId}`}>
      <SidebarMenuItem className="h-fit">
        <SidebarMenuButton
          onClick={() => handleSelectChatRoom(roomId)}
          className={cn(
            "h-fit rounded-2xl items-center transition-all flex gap-2",
            {
              "bg-muted": isActive,
            }
          )}
        >
          <Avatar className="size-10 sm:size-12">
            <AvatarImage src={avatarURL} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex-1 flex overflow-hidden flex-col gap-2">
            <span className="font-bold">{name}</span>
            <p className="text-muted-foreground truncate text-nowrap">
              {lastMessage}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">{lastMessageAt}</span>
            <Badge className="rounded-full">2</Badge>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  )
}

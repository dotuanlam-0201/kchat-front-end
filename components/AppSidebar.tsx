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
import { Skeleton } from "@/components/ui/skeleton"
import UserInfo from "@/components/UserInfo"
import { useQueryCache } from "@/hooks/useQueryCache"
import { useSocket } from "@/hooks/useSocket"
import { useQueryRooms } from "@/lib/actions/room.query"
import { QUERY_ME_KEY } from "@/lib/actions/user.query"
import { cn } from "@/lib/functions/cn"
import { IRoom } from "@/lib/model/room"
import { User } from "@/lib/model/user"
import { ROOM_TYPE } from "@/lib/types/room"
import { useRoomStore } from "@/zustand/store"
import { find, map } from "lodash"
import { useState } from "react"

const AppSidebar = () => {
  const { data: rooms, isFetching } = useQueryRooms()
  const currentUser: User = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User(),
  })
  const { selectedRoom } = useRoomStore()

  return (
    <Sidebar className="border-r-1" collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex items-center justify-between gap-4">
            <Icon.AppLogo className="text-primary max-h-10 max-w-30 rounded-full" />

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
              {map(rooms?.data, (room, i) => {
                const isActive = room._id === selectedRoom._id
                return (
                  <Room
                    isFetching={isFetching}
                    key={i}
                    isActive={isActive}
                    room={room}
                  />
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="sticky backdrop-blur-md rounded-3xl bottom-0">
          <SidebarGroupContent>
            <UserInfo user={currentUser.data} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar

const Room = ({
  room,
  isActive,
  isFetching,
}: {
  room: IRoom
  isActive: boolean
  isFetching: boolean
}) => {
  const { isMobile, toggleSidebar } = useSidebar()
  const { socket } = useSocket()
  const currentUser: User = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User(),
  })
  const { setSelectedRoom } = useRoomStore()

  const [lastMessage, setLastMessage] = useState(room.lastMessage)

  const handleSelectChatRoom = () => {
    if (isMobile) toggleSidebar()
    socket.emit("joinRoom", room._id)
    setSelectedRoom(room)
  }

  const renderRoomSingle = () => {
    const user = find(
      room.participants,
      ({ _id }) => _id !== currentUser.data._id
    )
    return (
      <SidebarMenuItem className="h-fit">
        <SidebarMenuButton
          onClick={() => handleSelectChatRoom()}
          className={cn(
            "h-fit rounded-sm items-center transition-all flex gap-2",
            {
              "bg-muted": isActive,
            }
          )}
        >
          <Avatar className="size-10 border sm:size-12">
            <AvatarImage src={""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex-1 flex overflow-hidden flex-col gap-2">
            <span className="font-bold">
              {user?.displayName ?? user?.email}
            </span>
            <p className="text-muted-foreground truncate text-nowrap">
              {lastMessage.text}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-muted-foreground">last seen</span>
            <Badge className="rounded-full">2</Badge>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  const renderRoomGroup = () => {
    return "group"
  }

  if (isFetching)
    return (
      <SidebarMenuItem className="h-fit">
        <SidebarMenuButton
          className={cn(
            "h-fit rounded-sm items-center transition-all flex gap-2"
          )}
        >
          <Skeleton className="size-10 rounded-full border sm:size-12"></Skeleton>

          <div className="flex-1 flex overflow-hidden flex-col gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )

  switch (room.type) {
    case ROOM_TYPE.single:
      return renderRoomSingle()
    case ROOM_TYPE.group:
      return renderRoomGroup()
    default:
      return null
  }
}

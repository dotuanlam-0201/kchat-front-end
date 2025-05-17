import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import useLastMessage from "@/hooks/useLastMessage"
import { useOnlineUsers } from "@/hooks/useOnlinUser"
import { useQueryCache } from "@/hooks/useQueryCache"
import { useSocket } from "@/hooks/useSocket"
import { QUERY_ME_KEY } from "@/lib/actions/user.query"
import { cn } from "@/lib/functions/cn"
import dayjs from "@/lib/functions/dayjs"
import { IRoom } from "@/lib/model/room"
import { User } from "@/lib/model/user"
import { ROOM_TYPE } from "@/lib/types/room"
import { useRoomStore } from "@/zustand/store"
import { find, includes } from "lodash"
import { FileDownIcon } from "lucide-react"
import { useEffect, useState } from "react"

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
  const { lastMessage, isNewMessage } = useLastMessage({
    room: room,
  })

  useEffect(() => setIsUnRead(isNewMessage), [isNewMessage])
  const [isUnRead, setIsUnRead] = useState(isNewMessage)

  const handleSelectChatRoom = () => {
    if (isMobile) toggleSidebar()
    socket.emit("joinRoom", room._id)
    setSelectedRoom(room)
    setIsUnRead(false)
  }

  const renderRoomSingle = () => {
    const user = find(
      room.participants,
      ({ _id }) => _id !== currentUser.data._id
    )
    const { onlineUsers } = useOnlineUsers()
    const isOnline = includes(onlineUsers, user?._id)
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
          <Avatar
            className={cn("size-10 border sm:size-12", {
              "border-2 border-primary": isOnline,
            })}
          >
            <AvatarImage src={user?.avatarURL} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex-1 flex overflow-hidden flex-col gap-2">
            <span className="font-bold">
              {user?.displayName ?? user?.phoneNumber}
            </span>

            {lastMessage?.text ? (
              <p
                className={cn("text-muted-foreground truncate text-nowrap", {
                  "font-extrabold": isUnRead,
                })}
              >
                {lastMessage?.text}
              </p>
            ) : (
              <FileDownIcon size={14} />
            )}
          </div>

          <div className="flex gap-2 items-end flex-col">
            <span className="text-muted-foreground text-[10px]">
              {dayjs(lastMessage?.createdAt).fromNow()}
            </span>
            {isUnRead && <Badge>1</Badge>}
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

export default Room

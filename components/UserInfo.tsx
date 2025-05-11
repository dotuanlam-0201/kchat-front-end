import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useOnlineUsers } from "@/hooks/useOnlinUser"
import { cn } from "@/lib/functions/cn"
import getFallbackAvatar from "@/lib/functions/getFallbackAvatar"
import { IUser } from "@/lib/model/user"
import { includes } from "lodash"
import { ReactNode } from "react"

const UserInfo = ({
  user,
  rightSide,
}: {
  user?: IUser
  rightSide?: ReactNode
}) => {
  const { onlineUsers } = useOnlineUsers()
  const isOnline = includes(onlineUsers, user?._id)
  return (
    <div className="flex gap-3 items-center">
      <Avatar
        className={cn("size-12 object-cover relative", {
          "border-2 border-primary": isOnline,
        })}
      >
        <AvatarImage src={user?.avatarURL} />
        <AvatarFallback>{getFallbackAvatar(user?.displayName)}</AvatarFallback>
      </Avatar>
      <div className="grow-1">
        <span className="block">{user?.displayName ?? user?.email}</span>
        <span className="muted">{user?.phoneNumber}</span>
      </div>
      {rightSide}
    </div>
  )
}

export default UserInfo

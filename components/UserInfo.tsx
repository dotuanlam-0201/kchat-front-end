import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getFallbackAvatar from "@/lib/functions/getFallbackAvatar"
import { IUser } from "@/lib/model/user"
import { ReactNode } from "react"

const UserInfo = ({
  user,
  rightSide,
}: {
  user?: IUser
  rightSide?: ReactNode
}) => {
  return (
    <div className="flex gap-3 items-center">
      <Avatar className="size-12 object-cover">
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

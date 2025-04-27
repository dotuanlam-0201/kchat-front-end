import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getFallbackAvatar from "@/lib/functions/getFallbackAvatar"
import { IUser } from "@/lib/model/user"

const UserInfo = ({ user }: { user?: IUser }) => {
  return (
    <div className="flex gap-3 items-center">
      <Avatar className="size-12">
        <AvatarImage src={user?.avatarURL} />
        <AvatarFallback>{getFallbackAvatar(user?.displayName)}</AvatarFallback>
      </Avatar>
      <div>
        <span className="block">{user?.displayName ?? user?.email}</span>
        <span className="muted">{user?.phoneNumber}</span>
      </div>
    </div>
  )
}

export default UserInfo

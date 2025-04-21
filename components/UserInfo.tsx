import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getFallbackAvatar from "@/lib/functions/getFallbackAvatar"
import { TypePartialUser } from "@/lib/types/response/user"

const UserInfo = ({ user }: { user: TypePartialUser }) => {
  return (
    <div className="flex gap-3 items-center">
      <Avatar className="size-12 border-3 border-primary">
        <AvatarImage src={user.avatarURL} />
        <AvatarFallback>{getFallbackAvatar(user.displayName)}</AvatarFallback>
      </Avatar>
      <div>
        <span className="block">{user.displayName ?? user.email}</span>
        <span className="muted">{user.phoneNumber}</span>
      </div>
    </div>
  )
}

export default UserInfo

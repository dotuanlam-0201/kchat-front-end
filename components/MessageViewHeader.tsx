import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import getFallbackAvatar from "@/lib/functions/getFallbackAvatar"
import { Cog6ToothIcon } from "@heroicons/react/24/solid"

const MessageViewHeader = () => {
  return (
    <header
      className="flex z-10 p-2 border-1 rounded-full sticky shadow-2xl top-4 backdrop-blur-xl items-center justify-between"
      role="banner"
    >
      <div className="flex items-center gap-4">
        <Avatar
          className="size-10 sm:size-12"
          role="img"
          aria-label="User avatar"
        >
          <AvatarImage />
          <AvatarFallback>{getFallbackAvatar("Tuan Lam")}</AvatarFallback>
        </Avatar>

        <div aria-label="User information">
          <span className="block font-semibold" role="heading">
            Do Tuan Lam
          </span>
          <Badge>Online</Badge>
          <Badge variant={"secondary"}>Offline</Badge>
        </div>
      </div>

      <nav className="flex gap-4 pr-4" aria-label="Chat actions">
        <Button
          variant="secondary"
          className="rounded-full"
          aria-label="Search"
          title="Search"
        >
          <Cog6ToothIcon />
        </Button>
      </nav>
    </header>
  )
}

export default MessageViewHeader

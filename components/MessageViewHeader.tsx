import { Button } from "@/components/ui/button"
import UserInfo from "@/components/UserInfo"
import { useQueryCache } from "@/hooks/useQueryCache"
import { QUERY_ME_KEY } from "@/lib/actions/user.query"
import { User } from "@/lib/model/user"
import { useRoomStore } from "@/zustand/store"
import { Cog6ToothIcon } from "@heroicons/react/24/solid"
import { find } from "lodash"

const MessageViewHeader = () => {
  const currentUser = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User(),
  })

  const { selectedRoom } = useRoomStore()

  const user = find(
    selectedRoom.participants,
    ({ _id }) => _id !== currentUser.data._id
  )

  return (
    <header
      className="flex z-10 p-2 border-1 rounded-full sticky shadow-2xl top-4 backdrop-blur-xl items-center justify-between"
      role="banner"
    >
      <div className="flex items-center gap-4">
        <UserInfo user={user} />
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

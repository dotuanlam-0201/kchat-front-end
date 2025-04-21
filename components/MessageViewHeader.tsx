import { Button } from "@/components/ui/button"
import UserInfo from "@/components/UserInfo"
import { useQueryMe } from "@/lib/actions/user.query"
import { Cog6ToothIcon } from "@heroicons/react/24/solid"

const MessageViewHeader = () => {
  const {
    data: { data },
  } = useQueryMe()
  return (
    <header
      className="flex z-10 p-2 border-1 rounded-full sticky shadow-2xl top-4 backdrop-blur-xl items-center justify-between"
      role="banner"
    >
      <div className="flex items-center gap-4">
        <UserInfo user={data} />
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

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserInfo from "@/components/UserInfo"
import { useQueryUsers } from "@/lib/actions/user.query"
import { TypePartialUser } from "@/lib/types/response/user"
import { PlusIcon } from "@radix-ui/react-icons"
import { map } from "lodash"

const PopupNewConversation = () => {
  const { data } = useQueryUsers()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"secondary"}>
          <PlusIcon /> Chat
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Start new conversation</DialogTitle>

        <div>
          {map(data?.data, (user: TypePartialUser) => (
            <Button
              key={user._id}
              className="w-full h-fit text-start justify-start"
              variant={"ghost"}
            >
              <UserInfo user={user} />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PopupNewConversation

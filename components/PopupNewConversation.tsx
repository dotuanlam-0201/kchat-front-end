import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserInfo from "@/components/UserInfo"
import { addRoom } from "@/lib/actions/room"
import { useQueryMe, useQueryUsers } from "@/lib/actions/user.query"
import { isSuccess } from "@/lib/functions/isSuccess"
import { TypePartialUser } from "@/lib/types/response/user"
import { PlusIcon } from "@radix-ui/react-icons"
import { useMutation } from "@tanstack/react-query"
import { filter, map } from "lodash"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { toast } from "react-toastify"

const PopupNewConversation = () => {
  const { data } = useQueryUsers()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: addRoom,
  })
  const router = useRouter()
  const { data: currentUser } = useQueryMe()

  const onCreateConversation = async (user: TypePartialUser) => {
    if (!user._id || !currentUser.data._id) {
      toast("User not found!")
      return
    }
    try {
      const res = await mutateAsync({
        participants: [user._id, currentUser.data._id],
        message: [],
        type: "single",
      })
      if (isSuccess(res)) router.replace(`room/${res.data._id}`)
    } catch (error: any) {
      toast(error?.message, {
        type: "error",
      })
    }
  }

  const listUsers = useMemo(
    () =>
      filter(
        data.data,
        (user: TypePartialUser) => user.email !== currentUser.data.email
      ),
    [data.data, currentUser.data]
  )

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
          {map(listUsers, (user: TypePartialUser) => (
            <Button
              onClick={() => onCreateConversation(user)}
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

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserInfo from "@/components/UserInfo"
import { useQueryCache } from "@/hooks/useQueryCache"
import { addRoom } from "@/lib/actions/room"
import { QUERY_ROOMS_KEY } from "@/lib/actions/room.query"
import { QUERY_ME_KEY, useQueryUsers } from "@/lib/actions/user.query"
import { isSuccess } from "@/lib/functions/isSuccess"
import { reFetchQuery } from "@/lib/functions/refetchQuery"
import { IUser, User } from "@/lib/model/user"
import { PlusIcon } from "@radix-ui/react-icons"
import { useMutation } from "@tanstack/react-query"
import { filter, map } from "lodash"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"

const PopupNewConversation = () => {
  const { data } = useQueryUsers()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addRoom,
  })
  const currentUser = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User(),
  })
  const [visiblePopup, setVisiblePopup] = useState(false as boolean)

  const onCreateConversation = async (user: IUser) => {
    if (!user._id || !currentUser.data._id) {
      toast("User not found!")
      return
    }
    try {
      const res = await mutateAsync({
        participants: [user._id, currentUser.data._id],
        message: [],
        type: "single",
        lastMessage: "",
      })
      if (isSuccess(res)) {
        setVisiblePopup(false)
        reFetchQuery(QUERY_ROOMS_KEY)
      }
    } catch (error: any) {
      toast(error?.message, {
        type: "error",
      })
    }
  }

  const listUsers = useMemo(
    () =>
      filter(data.data, (user: IUser) => user.email !== currentUser.data.email),
    [data.data, currentUser.data]
  )

  return (
    <Dialog open={visiblePopup} onOpenChange={setVisiblePopup}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setVisiblePopup(true)}
          size={"sm"}
          variant={"secondary"}
        >
          <PlusIcon /> Chat
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Start new conversation</DialogTitle>

        <div>
          {map(listUsers, (user: IUser) => (
            <Button
              isPending={isPending}
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

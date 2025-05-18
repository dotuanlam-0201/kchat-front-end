import AvatarUploader, { TypeImage } from "@/components/AvatarUploader"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useQueryCache } from "@/hooks/useQueryCache"
import useRefetch from "@/hooks/useRefetch"
import { updateUser } from "@/lib/actions/user"
import { QUERY_ME_KEY } from "@/lib/actions/user.query"
import { uploadFile } from "@/lib/actions/utils"
import { isSuccess } from "@/lib/functions/isSuccess"
import { User } from "@/lib/model/user"
import { UserProfileSchema } from "@/lib/types/zodSchema"
import { UserIcon } from "@heroicons/react/24/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

const PopupProfile = () => {
  const { data } = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User(),
  })
  const { refetch } = useRefetch()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: uploadFile,
  })
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
  })
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState({
    previewURL: data?.avatarURL as string | undefined,
    file: undefined as File | undefined,
  } as TypeImage)

  const form = useForm<z.infer<typeof UserProfileSchema>>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      displayName: data.displayName || "",
      email: data.email || "",
      phoneNumber: data.phoneNumber || "",
      avatarURL: data.avatarURL || "",
    },
  })

  const onSave = async (values: z.infer<typeof UserProfileSchema>) => {
    const avatarURL = await handleAvatarURL()
    const payload = {
      ...values,
      ...{
        avatarURL: avatarURL,
      },
    }
    const res = await updateUserMutation.mutateAsync(payload)
    if (isSuccess(res)) {
      toast("Update profile successfully!")
      setOpen(false)
      setTimeout(() => {
        refetch(QUERY_ME_KEY)
      }, 1000)
    }
  }

  const handleAvatarURL = async () => {
    if (!image.file) return data.avatarURL
    const res = await mutateAsync(image.file)
    if (isSuccess(res)) return res.data
    toast("Upload avatar failed", {
      type: "error",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          Profile <UserIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>

          <AvatarUploader
            handleChangeImage={setImage}
            image={image}
            user={data}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Peter@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="0707040566" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Do Tuan Lam" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isPending={isPending} onClick={form.handleSubmit(onSave)}>
            Save
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default PopupProfile

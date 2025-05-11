"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getFallbackAvatar from "@/lib/functions/getFallbackAvatar"
import { IUser } from "@/lib/model/user"
import { ALLOWED_IMAGES_TYPES, MAX_SIZE_IMAGE } from "@/lib/types/upload"
import { first, includes } from "lodash"
import { ChangeEvent, Fragment, useRef } from "react"
import { toast } from "react-toastify"

export type TypeImage = {
  previewURL?: string
  file?: File
}

const AvatarUploader = ({
  user,
  handleChangeImage,
  image,
}: {
  user?: IUser
  handleChangeImage: (payload: TypeImage) => void
  image: TypeImage
}) => {
  const ref = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    ref.current?.click()
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = first(e.target.files)
    if (!file) return
    const isValidType = includes(ALLOWED_IMAGES_TYPES, file.type)
    if (!isValidType) {
      toast(`Image not valid type!`, { type: "error" })
      return
    }
    const isValidSize = file.size <= MAX_SIZE_IMAGE
    if (!isValidSize) {
      toast(`Image must less than 1M`, { type: "error" })
      return
    }
    handleChangeImage({
      previewURL: URL.createObjectURL(file),
      file: file,
    })
  }
  return (
    <Fragment>
      <input onChange={onChange} className={"hidden"} type="file" ref={ref} />
      <span onClick={handleClick}>
        <Avatar className="size-20 cursor-pointer hover:opacity-50 mx-auto">
          <AvatarImage className="object-cover" src={image.previewURL} />
          <AvatarFallback>
            {getFallbackAvatar(user?.displayName)}
          </AvatarFallback>
        </Avatar>
      </span>
    </Fragment>
  )
}

export default AvatarUploader

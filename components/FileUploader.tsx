"use client"
import { MAX_SIZE_IMAGE } from "@/lib/types/upload"
import { first } from "lodash"
import {
  ChangeEvent,
  Fragment,
  InputHTMLAttributes,
  ReactNode,
  useRef,
} from "react"
import { toast } from "react-toastify"

interface IFileUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  onFileChange: (file: File) => void
}

const FileUploader = ({
  children,
  onFileChange,
  ...props
}: IFileUploaderProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    ref.current?.click()
  }
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = first(e.target.files)
    if (!file) return
    const isValidSize = file.size < MAX_SIZE_IMAGE
    if (!isValidSize) {
      toast("Maximum is 5M", { type: "warning" })
      return
    }
    onFileChange(file)
  }
  return (
    <Fragment>
      <input
        {...props}
        onChange={onChange}
        className={"hidden"}
        type="file"
        ref={ref}
      />
      <span className="" onClick={handleClick}>
        {children}
      </span>
    </Fragment>
  )
}

export default FileUploader

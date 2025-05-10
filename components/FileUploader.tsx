"use client"
import { first } from "lodash"
import {
  ChangeEvent,
  Fragment,
  InputHTMLAttributes,
  ReactNode,
  useRef,
} from "react"

interface IFileUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode
}

const FileUploader = ({ children, ...props }: IFileUploaderProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    ref.current?.click()
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = first(e.target.files)
    if (!file) return
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

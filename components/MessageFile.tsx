import { IMessage } from "@/lib/model/message"
import { ArrowPathIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useRef, useState } from "react"

const MessageFile = ({ message }: { message: IMessage }) => {
  const isImage = /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(message.fileURL || "")
  const [fileURL, setFileURL] = useState(message.fileURL)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  if (!fileURL) return null

  const handleDownloadFile = async () => {
    if (isImage || !message.fileURL) return
    try {
      setIsLoading(true)
      const response = await fetch(message.fileURL)
      if (!response.ok) throw new Error("Failed to fetch file.")
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = objectUrl
      a.download = `KChat-File`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(objectUrl)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.error("Download error:", err)
    }
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-black opacity-5">
          <ArrowPathIcon className="animate-spin absolute inset-0" />
        </div>
      )}
      <Image
        onClick={handleDownloadFile}
        ref={ref}
        onError={() => setFileURL("/message-image-placeholder.png")}
        className="rounded-lg cursor-pointer"
        src={fileURL}
        width={200}
        height={200}
        loading="lazy"
        alt={message.author?.displayName + "Image"}
      />
    </div>
  )
}

export default MessageFile

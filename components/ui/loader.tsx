import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"

const Loader = ({ className }: { className?: ClassValue }) => {
  return (
    <div className="flex flex-row gap-2">
      <div
        className={cn(
          "w-2 h-2 rounded-full bg-white animate-bounce",
          className
        )}
      ></div>
      <div
        className={cn(
          "w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]",
          className
        )}
      ></div>
      <div
        className={cn(
          "w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]",
          className
        )}
      ></div>
    </div>
  )
}

export default Loader

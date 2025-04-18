import CommonTooltip from "@/components/CommonTooltip"
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/solid"

const MessageSeenMarker = ({ isSeen }: { isSeen: boolean }) => {
  return isSeen ? (
    <CommonTooltip tooltip={"Seen"}>
      <CheckCircleIcon className="size-3 text-muted-foreground" />
    </CommonTooltip>
  ) : (
    <CommonTooltip tooltip={"Sent"}>
      <CheckIcon className="size-3" />
    </CommonTooltip>
  )
}

export default MessageSeenMarker

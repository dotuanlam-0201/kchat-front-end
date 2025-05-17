import { Skeleton } from "@/components/ui/skeleton"

const LoadingMoreMessage = ({ isFetching }: { isFetching: boolean }) => {
  if (!isFetching) return null
  return (
    <div className="space-y-2">
      <Skeleton className="h-4" />
      <Skeleton className="h-4" />
      <Skeleton className="h-4" />
      <Skeleton className="h-4" />
    </div>
  )
}

export default LoadingMoreMessage

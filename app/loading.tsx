import Loader from "@/components/ui/loader"

const Loading = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <Loader className="bg-primary size-10" />
    </div>
  )
}

export default Loading

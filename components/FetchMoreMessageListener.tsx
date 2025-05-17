import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const FetchMoreMessageListener = ({
  callback,
  enabled,
}: {
  callback: VoidFunction
  enabled: boolean
}) => {
  const { ref: ref, inView } = useInView()
  useEffect(() => {
    if (inView && enabled) callback()
  }, [inView])

  return <div ref={ref} />
}

export default FetchMoreMessageListener

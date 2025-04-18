import { useEffect, useRef } from 'react'

const useScrollToBottom = () => {
  const ref = useRef(null as null | HTMLElement)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [ref.current])
  return [ref]
}

export default useScrollToBottom

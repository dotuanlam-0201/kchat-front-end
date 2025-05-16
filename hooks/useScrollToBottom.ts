import { useScrollStore } from '@/zustand/store'
import { useEffect, useRef } from 'react'

const useScrollToBottom = () => {
  const ref = useRef(null as null | HTMLDivElement)
  const { autoScrollEnabled } = useScrollStore()

  useEffect(() => {
    if (!ref.current || !autoScrollEnabled) return
    const observer = new ResizeObserver(() => {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: "end",
      });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref.current, autoScrollEnabled])
  return { ref }
}

export default useScrollToBottom

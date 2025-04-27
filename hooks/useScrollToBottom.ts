import { useEffect, useRef } from 'react'

const useScrollToBottom = () => {
  const ref = useRef(null as null | HTMLDivElement)
  useEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver(() => {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref.current])
  return { ref }
}

export default useScrollToBottom

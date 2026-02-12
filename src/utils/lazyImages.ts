import { useEffect, useRef } from 'react'

export const useLazyImages = () => {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const realSrc = img.dataset.src
          if (realSrc) {
            img.src = realSrc
          }
        }
      })
    })

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return imgRef
}

export default useLazyImages

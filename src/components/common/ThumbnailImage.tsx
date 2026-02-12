import imgListThumb from '@/assets/images/imgListThumb.png'
import useLazyImages from '@/utils/lazyImages'
interface ThumbnailImageProps {
  imageUrl?: string | null | undefined
  alt?: string
  className?: string
}

export default function ThumbnailImage({
  imageUrl,
  alt = '썸네일 이미지',
  className = 'h-[162px] w-[228px] rounded object-cover shadow-lg rounded-2xl ml-[20px]',
}: ThumbnailImageProps) {
  if (!imageUrl) return null
  const imgRef = useLazyImages()
  return (
    <img
      ref={imgRef}
      data-src={imageUrl}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.src = imgListThumb
      }}
    />
  )
}

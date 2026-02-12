import ProfileThumb from '@/assets/images/svg/ProfileThumb.svg?react'
import useLazyImages from '@/utils/lazyImages'
interface ProfileImageProps {
  imageUrl?: string | null | undefined
  alt?: string
  size?: number
}

export default function ProfileImage({
  imageUrl,
  alt = '프로필 이미지',
  size = 24,
}: ProfileImageProps) {
  const imgRef = useLazyImages()
  return (
    <>
      {imageUrl ? (
        <img
          ref={imgRef}
          data-src={imageUrl}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="rounded-full object-cover"
          alt={alt}
          onError={(e) => {
            e.currentTarget.src = '/src/assets/images/svg/ProfileThumb.svg'
          }}
        />
      ) : (
        <ProfileThumb style={{ width: `${size}px`, height: `${size}px` }} />
      )}
    </>
  )
}

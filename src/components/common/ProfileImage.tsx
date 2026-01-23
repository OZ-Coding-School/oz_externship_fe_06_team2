import ProfileThumb from '@/assets/images/svg/ProfileThumb.svg?react'

interface ProfileImageProps {
  imageUrl?: string
  alt?: string
  size?: number
}

export default function ProfileImage({
  imageUrl,
  alt = '프로필 이미지',
  size = 24,
}: ProfileImageProps) {
  return (
    <>
      {imageUrl ? (
        <img
          className={`h-[${size}px] w-[${size}px] rounded-full object-cover`}
          src={imageUrl}
          alt={alt}
          onError={(e) => {
            e.currentTarget.src = '/src/assets/images/svg/ProfileThumb.svg'
          }}
        />
      ) : (
        <ProfileThumb className={`h-[${size}px] w-[${size}px]`} />
      )}
    </>
  )
}

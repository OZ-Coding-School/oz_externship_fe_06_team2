import ErrorIcon from '@/assets/images/svg/Error.svg?react'

export default function Error() {
  return (
    <div className="flex flex-col items-center">
      <ErrorIcon />
      <p className="mt-[20px] text-center text-[20px] text-[#9d9d9d]">
        페이지를 불러올 수 없어요 <br /> 잠시 후 다시 시도해주보세요!
      </p>
    </div>
  )
}

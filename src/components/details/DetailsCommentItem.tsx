import ProfileImage from '@/assets/images/svg/ProfileThumb.svg'
export default function DetailsCommentItem() {
  return (
    <li className="flex-start gap-[16px]">
      <img src={ProfileImage} alt="프로필 이미지" />
      <div className="w-full border-b border-[#E5E7EB] pb-[38px]">
        <div className="flex-center gap-[8px]">
          <span className="font-semibold text-[#4d4d4d]">{'이름'}</span>
          <span className="text-[12px] text-[#9d9d9d]">2025년 6월 13일</span>
        </div>
        <p className="mt-[20px]">도움 많이 되었습니다. 감사합니다!</p>
      </div>
    </li>
  )
}

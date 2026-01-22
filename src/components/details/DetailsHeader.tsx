import ChevronRightPupleIcon from '@/assets/images/svg/Chevron-right-puple.svg?react'
import TitleQ from '@/assets/images/svg/TitleQ.svg?react'
import ProfileImage from '@/assets/images/svg/ProfileThumb.svg'
export default function DetailsHeader() {
  return (
    <section className="details_header">
      <div>
        <div className="details_header_breadcrumb">
          프론트엔드 <ChevronRightPupleIcon /> 프로그래밍 언어{' '}
          <ChevronRightPupleIcon /> Python
        </div>

        <h2 className="details_header_title">
          <TitleQ className="mt-[4px]" />
          <span>
            print 를 5번 쓰지않고, print 를 1번만 쓰고 5줄을 모두 표시 하는 법이
            있나요?
          </span>
        </h2>
        <div className="flex-center gap-[12px]">
          <span className="text-[#9d9d9d]">조회수 60</span>
          <span className="dots"></span>
          <span className="text-[#9d9d9d]">15 시간 전</span>
        </div>
      </div>
      <div className="details_profile">
        <img src={ProfileImage} alt="프로필 이미지" />
        <span className="details_profile_name">김태산</span>
      </div>
    </section>
  )
}

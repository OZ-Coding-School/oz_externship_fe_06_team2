import ChevronRightPupleIcon from '@/assets/images/svg/Chevron-right-puple.svg?react'
import TitleQ from '@/assets/images/svg/TitleQ.svg?react'
import ProfileImage from '@/assets/images/svg/ProfileThumb.svg'
interface Props {
  title: string
  category: { names: string[] }
  viewCount: number
  created: string
  name: string
}
export default function DetailsHeader({
  title,
  category,
  viewCount,
  created,
  name,
}: Props) {
  return (
    <section className="details_header">
      <div>
        <div className="details_header_breadcrumb">
          {category.names[0]} <ChevronRightPupleIcon /> {category.names[1]}
          <ChevronRightPupleIcon /> {category.names[2]}
        </div>

        <h2 className="details_header_title">
          <TitleQ className="mt-[4px]" />
          <span>{title}</span>
        </h2>
        <div className="flex-center gap-[12px]">
          <span className="text-[#9d9d9d]">조회수 {viewCount}</span>
          <span className="dots"></span>
          <span className="text-[#9d9d9d]">{created}</span>
        </div>
      </div>
      <div className="details_profile">
        <img src={ProfileImage} alt="프로필 이미지" />
        <span className="details_profile_name">{name}</span>
      </div>
    </section>
  )
}

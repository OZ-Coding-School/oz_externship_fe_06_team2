import ChevronRightPupleIcon from '@/assets/images/svg/Chevron-right-puple.svg?react'
import TitleQ from '@/assets/images/svg/TitleQ.svg?react'
import ProfileImage from '@/assets/images/svg/ProfileThumb.svg'
import { getRelativeTime } from '@/utils/dayjs'
import { Link } from 'react-router'

interface Props {
  id: number
  title: string
  category: { names: string[] }
  viewCount: number
  created: string
  name: string
  authorId: number
  currentUserId?: number
}

export default function DetailsHeader({
  id,
  title,
  category,
  viewCount,
  created,
  name,
  authorId,
  currentUserId,
}: Props) {
  return (
    <section className="details_header">
      <div className="flex-center">
        <div className="flex-1">
          <div className="details_header_breadcrumb">
            {category.names[0]}

            {category.names[1] && (
              <>
                <ChevronRightPupleIcon /> {category.names[1]}
              </>
            )}

            {category.names[2] && (
              <>
                <ChevronRightPupleIcon /> {category.names[2]}
              </>
            )}
          </div>

          <h2 className="details_header_title">
            <TitleQ className="mt-[4px]" />
            <span>{title}</span>
          </h2>
        </div>
        <div className="details_profile">
          <img src={ProfileImage} alt="프로필 이미지" />
          <span className="details_profile_name">{name}</span>
        </div>
      </div>
      <div className="flex-center-between w-full flex-1 gap-[12px]">
        <div className="flex-center gap-[12px]">
          <span className="text-[#9d9d9d]">조회수 {viewCount}</span>
          <span className="dots"></span>
          <span className="text-[#9d9d9d]">{getRelativeTime(created)}</span>
        </div>
        {currentUserId && authorId === currentUserId && (
          <Link className="text-[#6201E0]" to={`/qnamodify/${id}`}>
            수정
          </Link>
        )}
      </div>
    </section>
  )
}

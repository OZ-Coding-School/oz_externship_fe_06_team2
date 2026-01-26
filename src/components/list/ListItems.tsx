import { Link } from 'react-router'
import type { QnaItem } from '@/types'
import CategoryBreadcrumb from '@/components/common/CategoryBreadcrumb'
import ProfileImage from '@/components/common/ProfileImage'
import ThumbnailImage from '@/components/common/ThumbnailImage'

interface ListItemsProps {
  item: QnaItem
}

export default function ListItems({ item }: ListItemsProps) {
  return (
    <li key={item.id} className="list_items flex-start-between">
      <div>
        {/* 카테고리 */}
        <CategoryBreadcrumb categories={item.category.names} />

        {/* 질문 제목 */}
        <Link
          to={`/qnadetails`}
          className="text-[18px] font-semibold text-black"
        >
          {item.title}
        </Link>

        {/* 질문 내용 */}
        <p className="mt-[12px] line-clamp-2 text-[14px] text-[#9d9d9d]">
          {item.content_preview}
        </p>

        {/* 답변 수, 조회수, 작성자, 작성일 */}
        <div className="flex-center-between bottom-[20px] mt-[36px]">
          <div className="flex-center-between gap-[19px]">
            <span className="flex-center-between gap-[9px] text-[12px] text-[#4d4d4d]">
              <span className="comment-icon">A</span>
              <span>답변 {item.answer_count}</span>
            </span>
            <span className="text-[12px] text-[#9d9d9d]">
              조회수 {item.view_count}
            </span>
          </div>

          <div className="flex-center gap-[4px]">
            <div className="flex-center gap-[4px]">
              <ProfileImage imageUrl={item.author.profile_image_url} />
              <span className="text-[12px] text-[#4d4d4d]">
                {item.author.nickname}
              </span>
            </div>
            <span className="text-[12px] text-[#9d9d9d]">
              {item.created_at}
            </span>
          </div>
        </div>
      </div>

      {/* 썸네일 */}
      <ThumbnailImage imageUrl={item.thumbnail_img_url} />
    </li>
  )
}

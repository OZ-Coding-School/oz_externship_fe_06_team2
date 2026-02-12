import { Link } from 'react-router'
import type { QnaItem } from '@/types'
import CategoryBreadcrumb from '@/components/common/CategoryBreadcrumb'
import ProfileImage from '@/components/common/ProfileImage'
import ThumbnailImage from '@/components/common/ThumbnailImage'
import { getRelativeTime } from '@/utils/dayjs'

interface ListItemsProps {
  item: QnaItem
  searchQuery?: string
}

export default function ListItems({ item, searchQuery }: ListItemsProps) {
  // 검색어 하이라이트 함수
  const highlightText = (text: string, query: string | undefined) => {
    if (!query || !query.trim()) return text

    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-[#6201E0]">
          {part}
        </span>
      ) : (
        part
      )
    )
  }
  return (
    <li key={item.id} className="list_items">
      <Link
        to={`/qnadetails/${item.id}`}
        className="flex-center-between h-full"
      >
        <div className="flex h-full flex-1 flex-col justify-between">
          <div>
            {/* 카테고리 */}
            <CategoryBreadcrumb categories={item.category.names} />

            {/* 질문 제목 */}
            <h3 className="line-clamp-3 text-[18px] font-semibold text-black underline">
              {highlightText(item.title, searchQuery)}
            </h3>
          </div>

          {/* 질문 내용 */}
          {/* <p className="mt-[12px] line-clamp-2 text-[14px] text-[#9d9d9d]">
          {item.content_preview}
        </p> */}

          {/* 답변 수, 조회수, 작성자, 작성일 */}
          <div className="flex-center-between bottom-[20px]">
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
                {getRelativeTime(item.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* 썸네일 */}
        <div>
          <ThumbnailImage imageUrl={item.thumbnail_img_url} />
        </div>
      </Link>
    </li>
  )
}

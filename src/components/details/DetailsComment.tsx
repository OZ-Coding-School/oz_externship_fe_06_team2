import SortIcon from '@/assets/images/svg/Sorting.svg?react'
import CommentIcon from '@/assets/images/svg/Comment.svg?react'
import DetailsCommentItem from '@/components/details/DetailsCommentItem'
import { useState } from 'react'

export default function DetailsComment() {
  //임시
  const comments = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const [isOpen, setIsOpen] = useState(false)
  const [sortType, setSortType] = useState('최신순')
  return (
    <div>
      <div className="flex-center-between mt-[40px] mb-[20px]">
        <strong className="flex-center gap-[8px] text-[20px] text-[#121212]">
          <CommentIcon />
          댓글 {comments.length}개
        </strong>

        {/* 드롭다운 */}
        <div className="relative">
          <button
            type="button"
            className="icon_button"
            onClick={() => setIsOpen(!isOpen)}
          >
            {sortType} <SortIcon />
          </button>

          {/* 드롭다운 레이어 */}
          {isOpen && (
            <ul className="dropdown">
              {['최신순', '오래된 순'].map((type) => (
                <li key={type}>
                  <button
                    type="button"
                    className={`${sortType === type ? 'bg-[#EFE6FC] font-bold text-[#6201E0] hover:bg-[#EFE6FC]' : 'text-[#6B7280]'}`}
                    onClick={() => {
                      setSortType(type)
                      setIsOpen(false)
                    }}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ul className="flex flex-col gap-[20px]">
        {comments.map((c) => (
          <DetailsCommentItem key={c.id} />
        ))}
      </ul>
    </div>
  )
}

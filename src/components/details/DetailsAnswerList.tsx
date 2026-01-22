import SortIcon from '@/assets/images/svg/Sorting.svg?react'
import CommentIcon from '@/assets/images/svg/Comment.svg?react'
import IconButton from '@/components/common/IconButton'
import DetailsCommentItem from '@/components/details/DetailsCommentItem'
import { useState } from 'react'

export default function DetailsCommentSection() {
  //임시
  const comments = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const [isOpen, setIsOpen] = useState(false) // 드롭다운 열림 상태
  const [sortType, setSortType] = useState('최신순') // 현재 정렬 기준
  return (
    <div>
      <div className="flex-center-between mt-[40px] mb-[20px]">
        <strong className="flex-center gap-[8px] text-[20px] text-[#121212]">
          <CommentIcon />
          댓글 {comments.length}개
        </strong>

        {/* 드롭다운 컨테이너  */}
        <div className="relative">
          <IconButton style="text" onClick={() => setIsOpen(!isOpen)}>
            {sortType} <SortIcon />
          </IconButton>

          {/* 드롭다운 레이어 */}
          {isOpen && (
            <ul className="absolute top-[110%] right-0 z-10 overflow-hidden rounded-[8px] bg-white p-[16px_20px] whitespace-nowrap shadow-[0px_0px_16px_0px_#A0A0A040]">
              {['최신순', '오래된 순'].map((type) => (
                <li key={type}>
                  <button
                    type="button"
                    className={`w-full p-[10px_20px] text-[#4D4D4D] hover:bg-[#ECECEC] ${sortType === type ? 'bg-[#EFE6FC] font-bold text-[#6201E0] hover:bg-[#EFE6FC]' : 'text-[#6B7280]'}`}
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

import SortIcon from '@/assets/images/svg/Sorting.svg?react'
import CommentIcon from '@/assets/images/svg/Comment.svg?react'
import IconButton from '@/components/IconButton'
import DetailsCommentItem from '@/components/details/DetailsCommentItem'

export default function DetailsCommentSection() {
  //임시
  const comments = [{ id: 1 }, { id: 2 }, { id: 3 }]

  return (
    <div>
      <div className="flex-center-between mt-[40px] mb-[20px]">
        <strong className="flex-center gap-[8px] text-[20px] text-[#121212]">
          <CommentIcon />
          댓글 {comments.length}개
        </strong>

        <IconButton style="text">
          최신순 <SortIcon />
        </IconButton>
      </div>

      <ul className="flex flex-col gap-[20px]">
        {comments.map((c) => (
          <DetailsCommentItem key={c.id} />
        ))}
      </ul>
    </div>
  )
}

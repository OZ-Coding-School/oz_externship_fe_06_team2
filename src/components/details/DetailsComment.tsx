import CommentIcon from '@/assets/images/svg/Comment.svg?react'
import DetailsCommentItem from '@/components/details/DetailsCommentItem'
import type { QnaComment } from '@/types'
interface Props {
  comments: QnaComment[]
}
export default function DetailsComment({ comments }: Props) {
  return (
    <div>
      <div className="flex-center-between mt-[40px] mb-[20px]">
        <strong className="flex-center gap-[8px] text-[20px] text-[#121212]">
          <CommentIcon />
          댓글 {comments.length}개
        </strong>
      </div>

      <ul className="flex flex-col gap-[20px]">
        {comments.map((c) => (
          <DetailsCommentItem comment={c} key={c.id} />
        ))}
      </ul>
    </div>
  )
}

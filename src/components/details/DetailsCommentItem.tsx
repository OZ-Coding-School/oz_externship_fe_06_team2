import ProfileImage from '@/components/common/ProfileImage'
import type { QnaComment } from '@/types'
import { formatDate } from '@/utils/dayjs'
interface Props {
  comment: QnaComment
}
export default function DetailsCommentItem({ comment }: Props) {
  return (
    <li className="flex-start gap-[16px]">
      <ProfileImage imageUrl={comment.author.profile_image_url} size={48} />
      <div className="w-full border-b border-[#E5E7EB] pb-[38px]">
        <div className="flex-center gap-[8px]">
          <span className="font-semibold text-[#4d4d4d]">
            {comment.author.nickname}
          </span>
          <span className="text-[12px] text-[#9d9d9d]">
            {formatDate(comment.created_at)}
          </span>
        </div>
        <p className="mt-[20px]">{comment.content}</p>
      </div>
    </li>
  )
}

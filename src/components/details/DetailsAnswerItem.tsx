import ProfileImage from '@/components/common/ProfileImage'
import TextArea from '@/components/common/TextArea'
import DetailsComment from '@/components/details/DetailsComment'
import type { QnaAnswer } from '@/types'
import { getRelativeTime } from '@/utils/dayjs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { MARKDOWN_COMPONENTS } from '@/constants/markdown'
import { useAuthStore } from '@/store'

interface Props {
  answer: QnaAnswer
}
export default function DetailsAnswerItem({ answer }: Props) {
  const userInfo = useAuthStore((state) => state.userInfo)
  return (
    <div className={`${answer.is_adopted ? 'choice' : ''} answer_box`}>
      {/* 답변 헤더 */}
      <div className="flex-center-between mb-[40px]">
        <div className="flex-center gap-[12px]">
          <ProfileImage imageUrl={answer.author.profile_image_url} size={48} />
          <div>
            <span className="answer_name">{answer.author.nickname}</span>
            <p className="answer_info">
              <span>
                IT스타트업 실무형 풀스택 웹 개발 부트캠프 (React + Node.js) &lt;
                1기 &gt;
              </span>
              <span className="dots"></span>
              <span>채택된 답변 수 98</span>
            </p>
          </div>
        </div>
        {answer.author.id !== userInfo?.id && (
          <button type="button" className="md purple_bg round">
            채택하기
          </button>
        )}
      </div>

      {/* 답변 본문 */}
      <div className="editor_content">
        <div className="editor_code">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={MARKDOWN_COMPONENTS}
          >
            {answer.content}
          </ReactMarkdown>
        </div>
        <p className="mt-[40px] text-right text-[#9d9d9d]">
          {getRelativeTime(answer.created_at)}
        </p>
      </div>

      {/* 댓글 입력 */}
      <TextArea />

      {/* 댓글 영역 */}
      <DetailsComment comments={answer.comments} />
    </div>
  )
}

import { useState } from 'react'
import ProfileImage from '@/components/common/ProfileImage'
import TextArea from '@/components/common/TextArea'
import DetailsComment from '@/components/details/DetailsComment'
import Editor from '@/components/Editor/Editor'
import type { QnaAnswer } from '@/types'
import { getRelativeTime } from '@/utils/dayjs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { MARKDOWN_COMPONENTS } from '@/constants/markdown'
import { useAuthStore } from '@/store'
import { useQnaAnswersAccept } from '@/hooks/useQnaAnswersAccept'
import { useQnaAnswersModify } from '@/hooks/useQnaAnswersModify'
import { useQnaAnswersComment } from '@/hooks/useQnaAnswersComment'

interface Props {
  answer: QnaAnswer
  hasAdoptedAnswer: boolean
  questionId: number
}
export default function DetailsAnswerItem({
  answer, // 답변 데이터
  hasAdoptedAnswer, // 해당 게시글에 채택된 답변이 있는지
  questionId, // 질문글의 id
}: Props) {
  const userInfo = useAuthStore((state) => state.userInfo)
  const { mutate: acceptAnswer } = useQnaAnswersAccept(questionId)
  const { mutate: modifyAnswer, isPending } = useQnaAnswersModify(questionId)
  const { mutate: submitComment, isPending: isCommentPending } =
    useQnaAnswersComment(questionId)

  // 편집 모드 상태
  const [isEditMode, setIsEditMode] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [editImageUrls, setEditImageUrls] = useState<string[]>([])

  // 수정하기 버튼 클릭
  const handleEditClick = () => {
    setEditContent(answer.content)
    setEditImageUrls([]) // 기존 이미지는 content에 포함되어 있음
    setIsEditMode(true)
  }

  // 수정 취소
  const handleCancelEdit = () => {
    setIsEditMode(false)
    setEditContent('')
    setEditImageUrls([])
  }

  // 수정 저장
  const handleSaveEdit = () => {
    if (!editContent.trim()) {
      alert('내용을 입력해주세요.')
      return
    }

    modifyAnswer(
      {
        answerId: answer.id,
        body: {
          content: editContent,
          image_urls: editImageUrls,
        },
      },
      {
        onSuccess: () => {
          setIsEditMode(false)
          setEditContent('')
          setEditImageUrls([])
        },
      }
    )
  }

  // 댓글 등록
  const handleCommentSubmit = (content: string) => {
    submitComment({
      answerId: answer.id,
      content,
    })
  }

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
        {!isEditMode && (
          <>
            {answer.author.id !== userInfo?.id && !hasAdoptedAnswer && (
              <button
                type="button"
                className="md purple_bg round"
                onClick={() => acceptAnswer(answer.id)}
              >
                채택하기
              </button>
            )}
            {answer.author.id === userInfo?.id && (
              <button
                type="button"
                className="md purple_line round"
                onClick={handleEditClick}
              >
                답변 수정하기
              </button>
            )}
          </>
        )}
        {isEditMode && (
          <div className="flex gap-[8px]">
            <button
              type="button"
              className="md purple_bg round"
              onClick={handleSaveEdit}
              disabled={isPending}
            >
              {isPending ? '저장 중...' : '저장'}
            </button>
            <button
              type="button"
              className="md purple_line round"
              onClick={handleCancelEdit}
              disabled={isPending}
            >
              취소
            </button>
          </div>
        )}
      </div>

      {/* 답변 본문 - 읽기 모드 */}
      {!isEditMode && (
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
      )}

      {/* 답변 본문 - 편집 모드 */}
      {isEditMode && (
        <div className="write_box">
          <Editor
            value={editContent}
            onChange={setEditContent}
            uploadType="answer"
          />
        </div>
      )}
      {userInfo && (
        <>
          {/* 댓글 입력 */}
          {!isEditMode && (
            <TextArea
              onSubmit={handleCommentSubmit}
              isPending={isCommentPending}
            />
          )}

          {/* 댓글 영역 */}
          {!isEditMode && <DetailsComment comments={answer.comments} />}
        </>
      )}
    </div>
  )
}

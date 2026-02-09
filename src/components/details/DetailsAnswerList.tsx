import DetailsAnswerItem from '@/components/details/DetailsAnswerItem'
import type { QnaAnswer } from '@/types'
interface DetailsAnswerListProps {
  answers: QnaAnswer[]
  questionId: number
}
export default function DetailsAnswerList({
  answers,
  questionId,
}: DetailsAnswerListProps) {
  const hasAdoptedAnswer = answers.some((answer) => answer.is_adopted)

  return (
    <section className="answer_area mt-[52px]">
      <h3 className="answer_title">
        <span className="answer_icon">A</span>
        {answers.length}개의 답변이 있어요
      </h3>

      <div className="flex flex-col gap-[24px]">
        {answers.map((answer) => (
          <DetailsAnswerItem
            key={answer.id}
            answer={answer}
            hasAdoptedAnswer={hasAdoptedAnswer}
            questionId={questionId}
          />
        ))}
      </div>
    </section>
  )
}

import DetailsAnswerItem from '@/components/details/DetailsAnswerItem'
export default function DetailsAnswerList() {
  // 임시
  const answers = [{ id: 1 }, { id: 2 }]
  return (
    <section className="answer_area mt-[52px]">
      <h3 className="answer_title">
        <span className="answer_icon">A</span>
        {answers.length}개의 답변이 있어요
      </h3>

      <div className="flex flex-col gap-[24px]">
        {answers.map((answer) => (
          <DetailsAnswerItem key={answer.id} />
        ))}
      </div>
    </section>
  )
}

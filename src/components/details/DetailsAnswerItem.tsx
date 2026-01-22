import ProfileImage from '@/assets/images/svg/ProfileThumb.svg'
import Button from '@/components/common/Button'
import TextArea from '@/components/common/TextArea'
import DetailsComment from '@/components/details/DetailsComment'

export default function DetailsAnswerItem() {
  return (
    <div className="answer_box">
      {/* 답변 헤더 */}
      <div className="flex-center-between mb-[40px]">
        <div className="flex-center gap-[12px]">
          <img src={ProfileImage} alt="프로필 이미지" />
          <div>
            <span className="answer_name">{'랑이'}</span>
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

        <Button size="md" style="purple_bg round">
          채택하기
        </Button>
      </div>

      {/* 답변 본문 */}
      <div className="editor_content">
        이렇게는 쓸 수 있을 것 같습니당.
        <div className="editor_code">에디터 코드 추후 수정</div>
        <p className="mt-[40px] text-right text-[#9d9d9d]">11 시간 전</p>
      </div>

      {/* 댓글 입력 */}
      <TextArea />

      {/* 댓글 영역 */}
      <DetailsComment />
    </div>
  )
}

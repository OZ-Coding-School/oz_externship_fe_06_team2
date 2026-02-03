import { useState } from 'react'
import ProfileImage from '@/assets/images/svg/ProfileThumb.svg'
import Editor from '@/components/Editor/Editor'

export default function DetailsWriter() {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    // TODO: Implement answer submission logic
    console.log('Answer content:', content)
    alert('답변이 등록되었습니다.')
  }

  return (
    <section className="writer_box mt-[52px]">
      <div className="writer_header">
        <div className="flex gap-[12px]">
          <img src={ProfileImage} alt="프로필 이미지" />
          <div>
            <span className="text-[12px] text-[#6201E0]">{'오즈오즈'} 님,</span>
            <p className="text-[18px] font-semibold text-[#222]">
              정보를 공유해 주세요.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="md purple_bg round"
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>
      <div className="write_box">
        <Editor value={content} onChange={setContent} />
      </div>
    </section>
  )
}

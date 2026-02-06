import { useState } from 'react'
import { useParams } from 'react-router'
import ProfileImage from '@/assets/images/svg/ProfileThumb.svg'
import Editor from '@/components/Editor/Editor'
import { useQnaDetailsAnswer } from '@/hooks/useQnaDetailsAnswer'

export default function DetailsWriter() {
  const { id } = useParams<{ id: string }>()
  const [content, setContent] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const { mutate: createAnswer, isPending } = useQnaDetailsAnswer()

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('내용을 입력해주세요.')
      return
    }

    createAnswer(
      {
        body: {
          content: content,
          image_urls: imageUrls,
        },
        id: Number(id),
      },
      {
        onSuccess: () => {
          console.log('답변 등록 성공 - 전송된 데이터:', {
            content: content,
            image_urls: imageUrls,
            question_id: Number(id),
          })
          alert('답변이 등록되었습니다.')
          setContent('')
          setImageUrls([])
        },
        onError: (error) => {
          console.error('답변 등록 실패:', error)
          alert('답변 등록 중 오류가 발생했습니다.')
        },
      }
    )
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

import { useState } from 'react'
import { useParams } from 'react-router'
import ProfileImage from '@/components/common/ProfileImage'
import Editor from '@/components/Editor/Editor'
import { useQnaDetailsAnswer } from '@/hooks/useQnaDetailsAnswer'
import { useAuthStore } from '@/store'

export default function DetailsWriter() {
  const { id } = useParams<{ id: string }>()
  const [content, setContent] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const userInfo = useAuthStore((state) => state.userInfo)
  const { mutate: createAnswer, isPending: _isPending } = useQnaDetailsAnswer()

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
          <ProfileImage imageUrl={userInfo?.profile_img_url} size={48} />
          <div>
            <span className="text-[12px] text-[#6201E0]">
              {userInfo?.nickname} 님,
            </span>
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
        <Editor value={content} onChange={setContent} uploadType="answer" />
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import DetailsHeader from '@/components/details/DetailsHeader'
import DetailsContents from '@/components/details/DetailsContents'
import DetailsWriter from '@/components/details/DetailsWriter'
import DetailsAnswerList from '@/components/details/DetailsAnswerList'
import AiAnswerSection from '@/components/details/DetailsChatbot'
import ProfileImage from '@/assets/images/svg/ProfileThumb.svg'
import { useQuery } from '@tanstack/react-query'
import { QnaDetails } from '@/api/qnadetails'
import { useParams } from 'react-router'
export default function QnaDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [showAnswerForm, setShowAnswerForm] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['qnaDetails', id],
    queryFn: () => QnaDetails(Number(id)),
  })

  // 페이지 마운트시 스크롤 탑으로 이동
  useEffect(() => {
    if (data) {
      window.scrollTo(0, 0)
    }
  }, [data])

  if (isLoading) return <div>로딩</div>
  if (isError || !data) return <div>에러</div>
  console.log(data)

  return (
    <div className="inner">
      <DetailsHeader
        title={data.title}
        category={data.category}
        viewCount={data.view_count}
        created={data.created_at}
        name={data.author.nickname}
      />
      <DetailsContents content={data.content} />
      <AiAnswerSection />

      {!showAnswerForm && (
        <div className="mt-[52px]">
          <div className="flex items-center justify-between rounded-[20px] border border-[#E5E7EB] bg-white px-[38px] py-[24px]">
            <div className="flex items-center gap-[12px]">
              <img
                src={ProfileImage}
                alt="프로필 이미지"
                className="h-[48px] w-[48px]"
              />
              <div>
                <span className="text-[12px] text-[#6201E0]">오즈오즈 님,</span>
                <p className="text-[18px] font-semibold text-[#222]">
                  정보를 공유해 주세요.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAnswerForm(true)}
              className="rounded-[8px] bg-[#7C3AED] px-[24px] py-[12px] text-[14px] font-semibold text-white transition-colors hover:bg-[#6D28D9]"
            >
              답변하기
            </button>
          </div>
        </div>
      )}

      {showAnswerForm && <DetailsWriter />}

      <DetailsAnswerList answers={data.answers} />
    </div>
  )
}

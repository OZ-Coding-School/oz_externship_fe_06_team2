import { useEffect, useState } from 'react'
import DetailsHeader from '@/components/details/DetailsHeader'
import DetailsContents from '@/components/details/DetailsContents'
import DetailsWriter from '@/components/details/DetailsWriter'
import DetailsAnswerList from '@/components/details/DetailsAnswerList'
import AiAnswerSection from '@/components/details/DetailsChatbot'
import ProfileImage from '@/components/common/ProfileImage'
import { useQuery } from '@tanstack/react-query'
import { QnaDetails } from '@/api/qnaDetails'
import { useParams } from 'react-router'
import { useAuthStore } from '@/store'
import Loading from '@/components/common/Loading'
import Error from '@/pages/Error'
export default function QnaDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [showAnswerForm, setShowAnswerForm] = useState(false)
  const userInfo = useAuthStore((state) => state.userInfo)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['qnaDetails', id],
    queryFn: () => QnaDetails(Number(id)),
  })
  console.log(userInfo?.profile_img_url)
  // 페이지 마운트시 스크롤 탑으로 이동
  useEffect(() => {
    if (data) {
      window.scrollTo(0, 0)
    }
  }, [data])

  if (isLoading) return <Loading />
  if (isError || !data) return <Error />

  return (
    <div className="inner">
      <DetailsHeader
        id={Number(id)}
        title={data.title}
        category={data.category}
        viewCount={data.view_count}
        created={data.created_at}
        name={data.author.nickname}
        profileImageUrl={data.author.profile_image_url}
        authorId={data.author.id}
        currentUserId={userInfo?.id}
      />
      <DetailsContents content={data.content} />

      {/* AI 답변 섹션 - 콘텐츠 바로 아래 위치 */}
      <AiAnswerSection questionId={Number(id)} />

      {userInfo && data.author.id !== userInfo.id && (
        <>
          {!showAnswerForm && (
            <div className="mt-[52px]">
              <div className="flex items-center justify-between rounded-[20px] border border-[#E5E7EB] bg-white px-[38px] py-[24px]">
                <div className="flex items-center gap-[12px]">
                  <ProfileImage
                    imageUrl={userInfo?.profile_img_url}
                    size={48}
                  />
                  <div>
                    <span className="text-[12px] text-[#6201E0]">
                      {userInfo?.nickname}님
                    </span>
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
        </>
      )}
      <DetailsAnswerList answers={data.answers} questionId={Number(id)} />
    </div>
  )
}

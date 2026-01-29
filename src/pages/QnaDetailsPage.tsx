import DetailsHeader from '@/components/details/DetailsHeader'
import DetailsContents from '@/components/details/DetailsContents'
import DetailsWriter from '@/components/details/DetailsWriter'
import DetailsAnswerList from '@/components/details/DetailsAnswerList'
import AiAnswerSection from '@/components/details/DetailsChatbot'
import { useQuery } from '@tanstack/react-query'
import { FetchQnaDetails } from '@/hooks/FetchQnaDetails'
import { useParams } from 'react-router'
export default function QnaDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['qnaDetails', id],
    queryFn: () => FetchQnaDetails(Number(id)),
  })

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
      <DetailsWriter />
      <DetailsAnswerList answers={data.answers} />
    </div>
  )
}

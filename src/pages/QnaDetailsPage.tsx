import DetailsHeader from '@/components/details/DetailsHeader'
import DetailsContents from '@/components/details/DetailsContents'
import DetailsWriter from '@/components/details/DetailsWriter'
import DetailsAnswerList from '@/components/details/DetailsAnswerList'
import { useQuery } from '@tanstack/react-query'
import { FetchQnaDetails } from '@/hooks/FetchQnaDetails'
import { useParams } from 'react-router'
export default function QnaDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['qnaDetails'],
    queryFn: () => FetchQnaDetails(Number(id)),
  })
  console.log(data)
  return (
    <div className="inner">
      <DetailsHeader />
      <DetailsContents />
      <DetailsWriter />
      <DetailsAnswerList />
    </div>
  )
}

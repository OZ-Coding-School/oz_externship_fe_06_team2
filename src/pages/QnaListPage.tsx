import { useQuery } from '@tanstack/react-query'
import ListContents from '@/components/list/ListContents'
import ListHeader from '@/components/list/ListHeader'
import { fetchQnaList } from '@/hooks/FetchQnaList'
import Loading from '@/components/common/Loading'

export default function QnaListPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['qnaList'],
    queryFn: fetchQnaList,
  })

  //  isLoading, isError 추후 작업
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <div>Error</div>
  }
  return (
    <div className="inner">
      <ListHeader />
      {data && <ListContents items={data.results} />}
    </div>
  )
}

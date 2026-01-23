import { useQuery } from '@tanstack/react-query'
import ListContents from '@/components/list/ListContents'
import ListHeader from '@/components/list/ListHeader'
import { fetchQnaList } from '@/hooks/FetchQnaList'

export default function QnaListPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['qnaList'],
    queryFn: fetchQnaList,
  })

  //  isLoading, isError 추후 작업

  return (
    <div className="inner">
      <ListHeader />
      {data && <ListContents items={data.results} />}
    </div>
  )
}

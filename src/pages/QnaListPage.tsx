import ListHeader from '@/components/list/ListHeader'
import Loading from '@/components/common/Loading'
import Error from '@/pages/Error'
import TabMenu from '@/components/list/TabMenu'
import ListItems from '@/components/list/ListItems'
import { useQnaListQuery } from '@/hooks/useQnaListQuery'

export default function QnaListPage() {
  const { filters, data, isLoading, isError } = useQnaListQuery()

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <Error />
  }

  return (
    <div className="inner">
      <ListHeader filters={filters} />
      <TabMenu filters={filters} />
      <ul>
        {data?.results.map((item) => (
          <ListItems key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}

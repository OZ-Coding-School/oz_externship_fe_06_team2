import ListHeader from '@/components/list/ListHeader'
import Loading from '@/components/common/Loading'
import Error from '@/pages/Error'
import TabMenu from '@/components/list/TabMenu'
import ListItems from '@/components/list/ListItems'
import { useQnaListQuery } from '@/hooks/useQnaListQuery'
import { useQnaListFilters } from '@/hooks/useQnaListFilters'
import Pagination from '@/components/common/Pagination'

export default function QnaListPage() {
  const filters = useQnaListFilters()

  const { data, isLoading, isError } = useQnaListQuery({
    searchQuery: filters.searchQuery,
    status: filters.status,
    sortOrder: filters.sort,
    categoryId: filters.categoryId,
    page: filters.page,
    size: filters.size,
  })

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
      {data?.results && data.results.length > 0 ? (
        <ul>
          {data.results.map((item) => (
            <ListItems key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-lg text-gray-500">
            조회 가능한 질문이 존재하지 않습니다.
          </p>
        </div>
      )}
      <Pagination
        currentPage={filters.page}
        totalPages={data?.count ? Math.ceil(data.count / filters.size) : 1}
        onPageChange={filters.setPage}
      />
    </div>
  )
}

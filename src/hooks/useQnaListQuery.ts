import { useQuery } from '@tanstack/react-query'
import { QnaList } from '@/api/qnaList'
import { useQnaListFilters } from '@/hooks/useQnaListFilters'

export function useQnaListQuery() {
  const filters = useQnaListFilters()

  const query = useQuery({
    queryKey: [
      'qnaList',
      filters.searchQuery, // 여기 값들이 변경되면 쿼리가 다시 실행됨
      filters.activeTab,
      filters.sortOrder,
      filters.filterDetailCategoryId,
    ],
    queryFn: () =>
      QnaList({
        search: filters.searchQuery,
        tab: filters.activeTab,
        sortOrder: filters.sortOrder,
        detailCategoryId: filters.filterDetailCategoryId,
      }),
  })

  return {
    filters,
    ...query,
  }
}

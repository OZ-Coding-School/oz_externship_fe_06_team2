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
        search_keyword: filters.searchQuery,
        answer_status: filters.activeTab,
        sort: filters.sortOrder,
        category_id: filters.filterDetailCategoryId,
      }),
  })

  return {
    filters,
    ...query,
  }
}

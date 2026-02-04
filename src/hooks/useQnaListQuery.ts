import { useQuery } from '@tanstack/react-query'
import { QnaList } from '@/api/qnaList'

interface QnaListQueryParams {
  searchQuery: string
  status: string | null
  sortOrder: string | null
  categoryId: number | null
  page: number
  size: number
}

export function useQnaListQuery({
  searchQuery,
  status,
  sortOrder,
  categoryId,
  page,
  size,
}: QnaListQueryParams) {
  return useQuery({
    queryKey: [
      'qnaList',
      searchQuery, // 여기 값들이 변경되면 쿼리가 다시 실행됨
      status,
      sortOrder,
      categoryId,
      page,
      size,
    ],
    queryFn: () =>
      QnaList({
        search_keyword: searchQuery || undefined,
        answer_status: status || undefined,
        sort: sortOrder || undefined,
        category_id: categoryId || undefined,
        page,
        size,
      }),
  })
}

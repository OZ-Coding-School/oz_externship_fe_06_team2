import { useQuery } from '@tanstack/react-query'
import { QnaCategory } from '@/api/qnaCategory'

export function useCategoryQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: QnaCategory,
  })
}

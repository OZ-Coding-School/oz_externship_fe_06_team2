import { useQuery } from '@tanstack/react-query'
import { QnaDetails } from '@/api/qnaDetails'

export function useQnaDetails(id: number) {
  return useQuery({
    queryKey: ['qnaDetails', id],
    queryFn: () => QnaDetails(id),
  })
}

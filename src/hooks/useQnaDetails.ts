import { useQuery } from '@tanstack/react-query'
import { QnaDetails } from '@/api/qnadetails'

export function useQnaDetails(id: number) {
  return useQuery({
    queryKey: ['qnaDetails', id],
    queryFn: () => QnaDetails(id),
  })
}

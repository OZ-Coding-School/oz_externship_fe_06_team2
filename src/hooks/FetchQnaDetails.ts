import type { QnaListResponse } from '@/types'

export const FetchQnaDetails = async (id: number): Promise<QnaListResponse> => {
  const response = await fetch(`/api/qna/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch QnA details')
  }
  return response.json()
}

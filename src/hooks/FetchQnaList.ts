import type { QnaListResponse } from '@/types'

export const fetchQnaList = async (): Promise<QnaListResponse> => {
  const response = await fetch('/api/qna')
  if (!response.ok) {
    throw new Error('Failed to fetch QnA list')
  }
  return response.json()
}

import type { QnaListResponse } from '@/types'

export const fetchQnaList = async (): Promise<QnaListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 3000)) // 로딩 테스트 추후 삭제
  const response = await fetch('/api/qna')
  if (!response.ok) {
    throw new Error('Failed to fetch QnA list')
  }
  return response.json()
}

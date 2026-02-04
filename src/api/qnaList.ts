import type { QnaListResponse } from '@/types'
import { api } from '@/api/api'

interface QnaListParams {
  search_keyword?: string
  answer_status?: string | null
  sort?: string
  category_id?: number | string | null
}
export const QnaList = async (
  params?: QnaListParams
): Promise<QnaListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 3000)) // 로딩 테스트 추후 삭제

  const response = await api.get<QnaListResponse>('/api/qna', {
    params,
  })

  return response.data
}

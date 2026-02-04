import type { QnaListResponse } from '@/types'
import { api } from '@/api/api'
import { BASE_URL } from '@/constants/qna'

interface QnaListParams {
  search_keyword?: string
  answer_status?: string | null
  sort?: string
  category_id?: number | string | null
  page?: number
  size?: number
}
export const QnaList = async (
  params?: QnaListParams
): Promise<QnaListResponse> => {
  // await new Promise((resolve) => setTimeout(resolve, 3000)) // 로딩 테스트 추후 삭제

  const response = await api.get<QnaListResponse>(`${BASE_URL}questions`, {
    params,
  })

  return response.data
}

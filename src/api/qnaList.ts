import type { QnaListResponse } from '@/types'
import { api } from '@/api/api'
import { BASE_URL } from '@/constants/qna'
import type { QnaListParams } from '@/types'

export const QnaList = async (
  params?: QnaListParams
): Promise<QnaListResponse> => {
  // await new Promise((resolve) => setTimeout(resolve, 3000)) // 로딩 테스트 추후 삭제

  const res = await api.get<QnaListResponse>(`${BASE_URL}questions`, {
    params,
  })

  return res.data
}

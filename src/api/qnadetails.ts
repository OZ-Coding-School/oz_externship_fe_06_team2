import { api } from '@/api/api'
import { BASE_URL } from '@/constants/qna'
import type { QnaDetailResponse } from '@/types'

export const QnaDetails = async (id: number): Promise<QnaDetailResponse> => {
  // await new Promise((resolve) => setTimeout(resolve, 3000)) // 로딩 테스트 추후 삭제

  const res = await api.get<QnaDetailResponse>(`${BASE_URL}questions/${id}`)

  return res.data
}

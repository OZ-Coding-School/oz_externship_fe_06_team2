import { api } from './api'
import { BASE_URL } from '@/constants/qna'
import type { CategoriesResponse } from '@/types'

//QnA 카테고리 목록 조회
export async function QnaCategory(): Promise<CategoriesResponse> {
  const res = await api.get<CategoriesResponse>(`${BASE_URL}categories`)

  return res.data
}

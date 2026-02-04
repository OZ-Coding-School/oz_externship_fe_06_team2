import { api } from './api'
import { BASE_URL } from '@/constants/qna'

export interface Category {
  id: number
  name: string
  depth: number
  subcategories: Category[]
}

export interface CategoriesResponse {
  categories: Category[]
}

//QnA 카테고리 목록 조회
export async function QnaCategory(): Promise<CategoriesResponse> {
  const response = await api.get<CategoriesResponse>(`${BASE_URL}categories`)

  return response.data
}

import type { QnaListResponse } from '@/types'
import { api } from '@/api/api'

interface QnaListParams {
  search?: string
  tab?: string
  sortOrder?: string
  mainCategoryId?: number | null
  subCategoryId?: number | null
  detailCategoryId?: number | null
}

export const QnaList = async (
  params?: QnaListParams
): Promise<QnaListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 3000)) // 로딩 테스트 추후 삭제

  // 쿼리 파라미터 생성
  const queryParams: Record<string, string> = {}

  if (params?.search) {
    queryParams.search_keyword = params.search
  }
  if (params?.tab && params.tab !== '전체보기') {
    queryParams.answer_status =
      params.tab === '답변완료' ? 'answered' : 'waiting'
  }
  if (params?.sortOrder) {
    queryParams.sort = params.sortOrder === '최신순' ? 'latest' : 'oldest'
  }
  if (params?.detailCategoryId) {
    queryParams.category_id = params.detailCategoryId.toString()
  }

  const response = await api.get<QnaListResponse>('/api/qna', {
    params: queryParams,
  })

  return response.data
}

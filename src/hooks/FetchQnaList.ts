import type { QnaListResponse } from '@/types'

interface FetchQnaListParams {
  search?: string
  tab?: string
  sortOrder?: string
  mainCategoryId?: number | null
  subCategoryId?: number | null
  detailCategoryId?: number | null
}

export const fetchQnaList = async (
  params?: FetchQnaListParams
): Promise<QnaListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 3000)) // 로딩 테스트 추후 삭제

  // 쿼리 파라미터 생성
  const queryParams = new URLSearchParams()

  if (params?.search) {
    queryParams.append('search', params.search)
  }
  if (params?.tab && params.tab !== '전체보기') {
    queryParams.append(
      'status',
      params.tab === '답변완료' ? 'completed' : 'pending'
    )
  }
  if (params?.sortOrder) {
    queryParams.append('sort', params.sortOrder === '최신순' ? 'desc' : 'asc')
  }
  if (params?.detailCategoryId) {
    queryParams.append('category', params.detailCategoryId.toString())
  }

  const queryString = queryParams.toString()
  const url = queryString ? `/api/qna?${queryString}` : '/api/qna'

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch QnA list')
  }
  return response.json()
}

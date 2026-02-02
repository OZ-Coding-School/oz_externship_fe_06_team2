import { useSearchParams } from 'react-router' // 또는 react-router-dom
import { useCallback, useState } from 'react'

const STATUS_MAP: Record<string, string> = {
  answered: '답변완료',
  waiting: '답변 대기중',
}

const SORT_MAP: Record<string, string> = {
  latest: '최신순',
  oldest: '오래된 순',
}

export function useQnaListFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  // URL 값으로 UI 상태 변환
  // 검색어
  const searchQuery = searchParams.get('search_keyword') || ''
  // 탭
  const activeTab =
    STATUS_MAP[searchParams.get('answer_status') || ''] || '전체보기'
  // 최신순 오래된순 정렬
  const sortOrder = SORT_MAP[searchParams.get('sort') || ''] || '최신순'
  // 필터
  const filterDetailCategoryId = searchParams.get('category_id')
    ? Number(searchParams.get('category_id'))
    : null

  // 필터 로컬 상태
  const [mainCategoryId, setMainCategoryId] = useState<number | null>(null)
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null)
  const [detailCategoryId, setDetailCategoryId] = useState<number | null>(null)

  // URL 파라미터 업데이트
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev)
        Object.entries(updates).forEach(([key, value]) => {
          if (!value) newParams.delete(key)
          else newParams.set(key, value)
        })
        return newParams
      })
    },
    [setSearchParams]
  )

  // 검색어
  const setSearchQuery = (query: string) =>
    updateParams({ search_keyword: query })

  // 탭
  const setActiveTab = (tab: string) => {
    const value =
      Object.keys(STATUS_MAP).find((key) => STATUS_MAP[key] === tab) || null
    updateParams({ answer_status: value })
  }
  // 최신순 오래된순 정렬
  const setSortOrder = (order: string) => {
    const value =
      Object.keys(SORT_MAP).find((key) => SORT_MAP[key] === order) || 'latest'
    updateParams({ sort: value })
  }

  // 필터 적용
  const handleApplyFilter = () => {
    updateParams({ category_id: detailCategoryId?.toString() || null })
  }

  // 필터 초기화
  const handleResetFilter = () => {
    setMainCategoryId(null)
    setSubCategoryId(null)
    setDetailCategoryId(null)
    updateParams({ category_id: null })
  }

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    sortOrder,
    setSortOrder,
    mainCategoryId,
    setMainCategoryId,
    subCategoryId,
    setSubCategoryId,
    detailCategoryId,
    setDetailCategoryId,
    filterDetailCategoryId,
    handleApplyFilter,
    handleResetFilter,
  }
}

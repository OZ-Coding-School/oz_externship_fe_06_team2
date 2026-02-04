import { useSearchParams } from 'react-router'
import { useCallback, useState } from 'react'
import { STATUS_MAP, SORT_MAP } from '@/constants/qna'

export function useQnaListFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  // URL 값으로 UI 상태 변환
  // 검색어
  const searchQuery = searchParams.get('search_keyword') || ''
  // 탭
  const activeTab =
    STATUS_MAP[searchParams.get('answer_status') || ''] || '전체보기'
  // 최신순 오래된순 정렬
  const sort = searchParams.get('sort')
  const sortOrder =
    sort === 'latest' ? '최신순' : sort === 'oldest' ? '오래된 순' : '정렬'

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

  // 필터 모달 적용
  const handleApplyFilter = () => {
    updateParams({
      category_id:
        (detailCategoryId || subCategoryId || mainCategoryId)?.toString() ||
        null,
    })
  }

  // 필터 모달 초기화
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

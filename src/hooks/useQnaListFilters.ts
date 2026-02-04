import { useSearchParams } from 'react-router'
import { useCallback, useState } from 'react'
import { STATUS_MAP, SORT_MAP } from '@/constants/qna'

export function useQnaListFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // 드롭다운 레이어
  const [isFilterOpen, setIsFilterOpen] = useState(false) // 필터 모달

  // api 호출 넘기는 값
  const searchQuery = searchParams.get('search_keyword') || ''
  const status = searchParams.get('answer_status')
  const sort = searchParams.get('sort')
  const categoryId = Number(searchParams.get('category_id')) || null
  const page = Number(searchParams.get('page')) || 1
  const size = Number(searchParams.get('size')) || 10

  // UI 렌더링용 값
  const activeTab = status ? STATUS_MAP[status] || '전체보기' : '전체보기'
  const sortOrder =
    sort === 'latest' ? '최신순' : sort === 'oldest' ? '오래된 순' : '정렬'

  // 필터 모달 로컬 상태
  const [mainCategoryId, setMainCategoryId] = useState<number | null>(null)
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null)
  const [detailCategoryId, setDetailCategoryId] = useState<number | null>(null)

  // URL 파라미터 업데이트 공통 로직
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev)
        Object.entries(updates).forEach(([key, value]) => {
          if (!value || value === 'all') newParams.delete(key)
          else newParams.set(key, value)
        })
        return newParams
      })
    },
    [setSearchParams]
  )

  const setSearchQuery = (query: string) =>
    updateParams({ search_keyword: query })

  // 한글 라벨을 영어 Key로 변환하는 헬퍼 함수
  const getLabelToKey = (map: Record<string, string>, label: string) => {
    return Object.keys(map).find((key) => map[key] === label) || null
  }

  const setActiveTab = (tabLabel: string) => {
    updateParams({ answer_status: getLabelToKey(STATUS_MAP, tabLabel) })
  }

  const setSortOrder = (sortLabel: string) => {
    updateParams({ sort: getLabelToKey(SORT_MAP, sortLabel) })
  }

  const setPage = (newPage: number) => {
    updateParams({ page: newPage.toString() })
  }

  //필터 모달 적용
  const handleApplyFilter = () => {
    const finalId = detailCategoryId || subCategoryId || mainCategoryId
    updateParams({ category_id: finalId?.toString() || null })
    setIsFilterOpen(false)
  }

  //필터 모달 초기화
  const handleResetFilter = () => {
    setMainCategoryId(null)
    setSubCategoryId(null)
    setDetailCategoryId(null)
    updateParams({ category_id: null })
    setIsFilterOpen(false)
  }

  return {
    // API에 보낼 값
    searchQuery,
    status,
    sort,
    categoryId,
    page,
    size,

    // UI에 보여줄 값
    activeTab,
    sortOrder,

    // 필터 로컬 상태 및 핸들러
    mainCategoryId,
    setMainCategoryId,
    subCategoryId,
    setSubCategoryId,
    detailCategoryId,
    setDetailCategoryId,
    setSearchQuery,
    setActiveTab,
    setSortOrder,
    setPage,
    isDropdownOpen,
    setIsDropdownOpen,
    isFilterOpen,
    setIsFilterOpen,
    handleApplyFilter,
    handleResetFilter,
  }
}

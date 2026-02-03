import SortIcon from '@/assets/images/svg/Sorting.svg?react'
import FilterIcon from '@/assets/images/svg/Filter.svg?react'
import { useState } from 'react'
import Modal from '@/components/common/Modal'
import CategorySelect from '@/components/common/CategorySelect'
import { useQnaListFilters } from '@/hooks/useQnaListFilters'

interface TabMenuProps {
  filters: ReturnType<typeof useQnaListFilters>
}

export default function TabMenu({ filters }: TabMenuProps) {
  const tabs = ['전체보기', '답변완료', '답변 대기중']
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // 드롭다운 레이어
  const [isFilterOpen, setIsFilterOpen] = useState(false) // 필터 모달

  const {
    activeTab,
    setActiveTab,
    handleApplyFilter,
    handleResetFilter,
    sortOrder,
    setSortOrder,
    mainCategoryId,
    setMainCategoryId,
    subCategoryId,
    setSubCategoryId,
    detailCategoryId,
    setDetailCategoryId,
  } = filters

  // 필터 적용하기 버튼
  const submitApplyFilter = () => {
    handleApplyFilter()
    setIsFilterOpen(false)
  }
  // 필터 초기화 버튼
  const submitResetFilter = () => {
    handleResetFilter()
    setIsFilterOpen(false)
  }
  return (
    <nav className="flex items-center justify-between border-b border-[#E5E7EB]">
      <div className="flex items-center gap-[40px]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`tab_button ${isActive ? 'text-[#6201E0]' : 'text-[#ADADAD] hover:text-[#757575]'} `}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#6201E0]" />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-[16px]">
        <div className="relative">
          <button
            type="button"
            className="icon_button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {sortOrder === '' ? '최신순' : sortOrder} <SortIcon />
          </button>

          {/* 드롭다운 레이어 */}
          {isDropdownOpen && (
            <ul className="dropdown">
              {['최신순', '오래된 순'].map((type) => (
                <li key={type}>
                  <button
                    type="button"
                    className={`${sortOrder === type ? 'bg-[#EFE6FC] font-bold text-[#6201E0] hover:bg-[#EFE6FC]' : 'text-[#6B7280]'}`}
                    onClick={() => {
                      setSortOrder(type)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className="icon_button text"
          onClick={() => setIsFilterOpen(true)}
        >
          필터 <FilterIcon />
        </button>
      </div>

      {/* 필터 전용 모달 */}
      <Modal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        size="lg"
        title="필터"
        onResetFilter={submitResetFilter}
        onApplyFilter={submitApplyFilter}
      >
        <div className="min-h-[200px]">
          <CategorySelect
            mainCategoryId={mainCategoryId}
            subCategoryId={subCategoryId}
            detailCategoryId={detailCategoryId}
            onMainCategoryChange={setMainCategoryId}
            onSubCategoryChange={setSubCategoryId}
            onDetailCategoryChange={setDetailCategoryId}
            viewMode="column"
          />
        </div>
      </Modal>
    </nav>
  )
}

import SortIcon from '@/assets/images/svg/Sorting.svg?react'
import FilterIcon from '@/assets/images/svg/Filter.svg?react'
import { useState } from 'react'
import Modal from '@/components/common/Modal'

interface TabMenuProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  sortOrder: string
  setSortOrder: (order: string) => void
}

export default function TabMenu({
  activeTab,
  setActiveTab,
  sortOrder,
  setSortOrder,
}: TabMenuProps) {
  const tabs = ['전체보기', '답변완료', '답변 대기중']
  const [isOpen, setIsOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
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
            onClick={() => setIsOpen(!isOpen)}
          >
            {sortOrder} <SortIcon />
          </button>

          {/* 드롭다운 레이어 */}
          {isOpen && (
            <ul className="dropdown">
              {['최신순', '오래된 순'].map((type) => (
                <li key={type}>
                  <button
                    type="button"
                    className={`${sortOrder === type ? 'bg-[#EFE6FC] font-bold text-[#6201E0] hover:bg-[#EFE6FC]' : 'text-[#6B7280]'}`}
                    onClick={() => {
                      setSortOrder(type)
                      setIsOpen(false)
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
      {/* 필터 전용 모달 적용 */}
      <Modal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        size="lg"
        title="필터"
      >
        <div className="min-h-[200px]">
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
          <p className="text-gray-600">필터 옵션들이 들어갈 자리입니다.</p>
        </div>
      </Modal>
    </nav>
  )
}

import SortIcon from '@/assets/images/svg/Sorting.svg?react'
import FilterIcon from '@/assets/images/svg/Filter.svg?react'
import { useState } from 'react'

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
              className={`relative h-[56px] text-[18px] font-bold transition-colors ${isActive ? 'text-[#6201E0]' : 'text-[#ADADAD] hover:text-[#757575]'} `}
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
            <ul className="absolute top-[110%] right-0 z-10 overflow-hidden rounded-[8px] bg-white p-[16px_20px] whitespace-nowrap shadow-[0px_0px_16px_0px_#A0A0A040]">
              {['최신순', '오래된 순'].map((type) => (
                <li key={type}>
                  <button
                    type="button"
                    className={`w-full p-[10px_20px] text-[#4D4D4D] hover:bg-[#ECECEC] ${sortOrder === type ? 'bg-[#EFE6FC] font-bold text-[#6201E0] hover:bg-[#EFE6FC]' : 'text-[#6B7280]'}`}
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

        <button type="button" className="icon_button text">
          필터 <FilterIcon />
        </button>
      </div>
    </nav>
  )
}

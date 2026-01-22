import { useState } from 'react'
import Button from '@/components/common/Button'
import FilterIcon from '@/assets/images/svg/Filter.svg?react'
import SearchIcon from '@/assets/images/svg/Search.svg?react'
import PencilIcon from '@/assets/images/svg/Pencil.svg?react'
import SortingIcon from '@/assets/images/svg/Sorting.svg?react'
import LinkShareIcon from '@/assets/images/svg/Link-share.svg?react'
import SortIcon from '@/assets/images/svg/Sorting.svg?react'
import ProfileImage from '@/assets/images/svg/ProfileThumb.svg'
import CommentIcon from '@/assets/images/svg/Comment.svg?react'
import SearchClearIcon from '@/assets/images/svg/SearchClear.svg?react'
import ChevronRightPupleIcon from '@/assets/images/svg/Chevron-right-puple.svg?react'
import TitleQ from '@/assets/images/svg/TitleQ.svg?react'

import TextArea from '@/components/common/TextArea'
import IconButton from '@/components/common/IconButton'
import InputSearch from '@/components/common/InputSearch'
// 탭 데이터 정의
const TABS = [
  { id: 'button', label: '버튼' },
  { id: 'svg', label: 'SVG' },
  { id: 'textarea', label: '텍스트에어리어' },
  { id: 'input', label: '인풋' },
]

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState('button')

  return (
    <div className="flex min-h-screen bg-white">
      {/* 탭 메뉴 */}
      <aside className="w-[240px] border-r border-[#E5E7EB] p-6">
        <h1 className="mb-8 text-[20px] font-bold text-[#6201E0]">
          Design Guide
        </h1>
        <nav className="flex flex-col gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex h-[48px] items-center rounded-[8px] px-4 font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#EFE6FC] text-[#6201E0]'
                  : 'text-[#6B7280] hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-10">
        {/* 버튼  */}
        {activeTab === 'button' && (
          <section className="flex flex-col gap-6">
            <h2 className="text-[32px] font-bold text-[#121212]">
              Button Components
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button className="sm purple_line round">등록</Button>
              <Button disabled={true} className="sm purple_line round">
                등록
              </Button>
              <Button className="sm purple_bg round">등록</Button>
              <Button className="md purple_line round">등록</Button>
              <IconButton className="bg">
                <PencilIcon />
                질문하기
              </IconButton>
              <IconButton className="border">
                <LinkShareIcon />
                공유하기
              </IconButton>
              <IconButton className="text">
                최신순 <SortIcon />
              </IconButton>
            </div>
            <div className="w-[300px]">
              <Button className="full purple_line round">등록</Button>
            </div>
            <Button className="lg purple_bg square">등록하기</Button>
          </section>
        )}

        {/* svg */}
        {activeTab === 'svg' && (
          <section>
            <h2 className="mb-6 text-[32px] font-bold text-[#121212]">Svg</h2>
            <div className="mb-10 flex items-center gap-6">
              <FilterIcon />
              <SearchIcon />
              <SortingIcon />
              <PencilIcon />
              <LinkShareIcon />
              <SortIcon />
              <CommentIcon />
              <SearchClearIcon />
              <ChevronRightPupleIcon />
              <TitleQ />
            </div>
          </section>
        )}

        {/* textarea */}
        {activeTab === 'textarea' && (
          <section>
            <h2 className="mb-6 text-[32px] font-bold text-[#121212]">
              TextArea
            </h2>
            <TextArea />
          </section>
        )}
        {/* input */}

        {activeTab === 'input' && (
          <section>
            <h2 className="mb-6 text-[32px] font-bold text-[#121212]">Input</h2>
            <InputSearch />
          </section>
        )}
      </main>
    </div>
  )
}

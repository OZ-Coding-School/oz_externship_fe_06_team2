import { useState } from 'react'
import Button from '@/components/Button'
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

import TextArea from '@/components/TextArea'
import IconButton from '@/components/IconButton'
import InputSearch from '@/components/InputSearch'
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
              <Button size="sm" style="purple_line round">
                등록
              </Button>
              <Button size="sm" disabled={true} style="purple_line round">
                등록
              </Button>
              <Button size="sm" style="purple_bg round">
                등록
              </Button>
              <Button size="md" style="purple_line round">
                등록
              </Button>
              <IconButton style="bg">
                <PencilIcon />
                질문하기
              </IconButton>
              <IconButton style="border">
                <LinkShareIcon />
                공유하기
              </IconButton>
              <IconButton style="text">
                최신순 <SortIcon />
              </IconButton>
            </div>
            <div className="w-[300px]">
              <Button size="full" style="purple_line round">
                등록
              </Button>
            </div>
            <Button size="lg" style="purple_bg square">
              등록하기
            </Button>
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

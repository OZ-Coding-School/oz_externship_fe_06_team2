import { useState } from 'react'
import FilterIcon from '@/assets/images/svg/Filter.svg?react'
import SearchIcon from '@/assets/images/svg/Search.svg?react'
import PencilIcon from '@/assets/images/svg/Pencil.svg?react'
import SortingIcon from '@/assets/images/svg/Sorting.svg?react'
import LinkShareIcon from '@/assets/images/svg/Link-share.svg?react'
import SortIcon from '@/assets/images/svg/Sorting.svg?react'
import CommentIcon from '@/assets/images/svg/Comment.svg?react'
import SearchClearIcon from '@/assets/images/svg/SearchClear.svg?react'
import ChevronRightPupleIcon from '@/assets/images/svg/Chevron-right-puple.svg?react'
import TitleQ from '@/assets/images/svg/TitleQ.svg?react'

import TextArea from '@/components/common/TextArea'
import InputSearch from '@/components/common/InputSearch'
import Pagination from '@/components/common/Pagination'
import Loading from '@/components/common/Loading'

interface CodeBlockProps {
  code: string
}
// 탭 데이터 정의
const TABS = [
  { id: 'button', label: '버튼' },
  { id: 'svg', label: 'SVG' },
  { id: 'textarea', label: '텍스트에어리어' },
  { id: 'input', label: '인풋' },
  { id: 'pagination', label: '페이지네이션' },
  { id: 'loading', label: '로딩' },
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

            <div className="flex flex-col items-start gap-4">
              <button type="button" className="sm purple_line round">
                등록
              </button>
              <CodeBlock
                code={`<button type="button" className="sm purple_line round">
  등록
</button>`}
              />

              <button type="button" disabled className="sm purple_line round">
                등록
              </button>
              <CodeBlock
                code={`<button type="button" disabled className="sm purple_line round">
  등록
</button>`}
              />

              <button type="button" className="sm purple_bg round">
                등록
              </button>
              <CodeBlock
                code={`<button type="button" className="sm purple_bg round">
  등록
</button>`}
              />

              <button type="button" className="md purple_line round">
                등록
              </button>
              <CodeBlock
                code={`<button type="button" className="md purple_line round">
  등록
</button>`}
              />

              <button type="button" className="icon_button bg">
                <PencilIcon />
                질문하기
              </button>
              <CodeBlock
                code={`<button type="button" className="icon_button bg">
  <PencilIcon />
  질문하기
</button>`}
              />

              <button type="button" className="icon_button border">
                <LinkShareIcon />
                공유하기
              </button>
              <CodeBlock
                code={`<button type="button" className="icon_button border">
  <LinkShareIcon />
  공유하기
</button>`}
              />

              <button type="button" className="icon_button text">
                최신순 <SortIcon />
              </button>
              <CodeBlock
                code={`<button type="button" className="icon_button text">
  최신순 <SortIcon />
</button>`}
              />
            </div>

            <div className="flex w-[300px] flex-col items-start gap-4">
              <button type="button" className="full purple_line round">
                등록
              </button>
              <CodeBlock
                code={`<button type="button" className="full purple_line round">
  등록
</button>`}
              />
            </div>

            <button type="button" className="lg purple_bg square">
              등록하기
            </button>
            <CodeBlock
              code={`<button type="button" className="lg purple_bg square">
  등록하기
</button>`}
            />
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
            <CodeBlock
              code={`<FilterIcon />
<SearchIcon />
<SortingIcon />
<PencilIcon />
<LinkShareIcon />
<SortIcon />
<CommentIcon />
<SearchClearIcon />
<ChevronRightPupleIcon />
<TitleQ />`}
            />
          </section>
        )}

        {/* textarea */}
        {activeTab === 'textarea' && (
          <section>
            <h2 className="mb-6 text-[32px] font-bold text-[#121212]">
              TextArea
            </h2>
            <div className="mb-2">
              <TextArea
                onSubmit={function (content: string): void {
                  throw new Error('Function not implemented.')
                }}
                isPending={false}
              />
            </div>
            <CodeBlock code={`<TextArea />`} />
          </section>
        )}
        {/* input */}

        {activeTab === 'input' && (
          <section>
            <h2 className="mb-6 text-[32px] font-bold text-[#121212]">Input</h2>
            <div className="mb-2">
              <InputSearch value="" onChange={() => {}} />
            </div>
            <CodeBlock code={`<InputSearch value="" onChange={() => {}} />`} />
          </section>
        )}
        {/* pagination */}
        {activeTab === 'pagination' && (
          <section>
            <h2 className="mb-6 text-[32px] font-bold text-[#121212]">
              Pagination
            </h2>
            <div className="mb-2">
              <Pagination
                currentPage={1}
                totalPages={10}
                onPageChange={() => {}}
              />
            </div>
            <CodeBlock
              code={`<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />`}
            />
          </section>
        )}
        {/* loading */}
        {activeTab === 'loading' && (
          <section>
            <h2 className="mb-6 text-[32px] font-bold text-[#121212]">
              Loading
            </h2>
            <div className="mb-4">
              <Loading />
            </div>
            <CodeBlock code={`<Loading />`} />
          </section>
        )}
      </main>
    </div>
  )
}

function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative rounded-[8px] bg-[#111827] p-2 pr-[64px] text-sm text-white">
      <button
        onClick={handleCopy}
        className="absolute top-1.5 right-3 rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
      >
        {copied ? '복사됨' : '복사'}
      </button>

      <pre className="overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}

import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import SelectArrowIcon from '@/assets/images/svg/SelectArr.svg?react'
import SelectCheckIcon from '@/assets/images/svg/SelectChk.svg?react'
interface CategoryData {
  id: number
  name: string
  level: 'main' | 'sub' | 'detail'
}

const DUMMY_CATEGORIES: CategoryData[] = [
  { id: 1, name: '프론트엔드', level: 'main' },
  { id: 2, name: '백엔드', level: 'main' },
  { id: 3, name: '프로그래밍 언어', level: 'sub' },
  { id: 4, name: '웹프레임워크', level: 'sub' },
  { id: 5, name: 'Web', level: 'sub' },
  { id: 6, name: 'OS', level: 'sub' },
  { id: 8, name: '라이브러리', level: 'sub' },
  { id: 9, name: 'Javascript', level: 'detail' },
  { id: 10, name: 'React', level: 'detail' },
  { id: 11, name: 'Next.js', level: 'detail' },
  { id: 12, name: 'Python', level: 'detail' },
  { id: 13, name: 'Nginx', level: 'detail' },
  { id: 14, name: 'Django', level: 'detail' },
  { id: 15, name: 'FastAPI', level: 'detail' },
]

interface CategorySelectProps {
  mainCategoryId: number | null
  subCategoryId: number | null
  detailCategoryId: number | null
  onMainCategoryChange: (id: number | null) => void
  onSubCategoryChange: (id: number | null) => void
  onDetailCategoryChange: (id: number | null) => void
}

export default function CategorySelect({
  mainCategoryId,
  subCategoryId,
  detailCategoryId,
  onMainCategoryChange,
  onSubCategoryChange,
  onDetailCategoryChange,
}: CategorySelectProps) {
  const [isMainOpen, setIsMainOpen] = useState(false)
  const [isSubOpen, setIsSubOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const mainRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  // 대분류 옵션 필터
  const allMainCategories = DUMMY_CATEGORIES.filter(
    (cat) => cat.level === 'main'
  )
  // 중분류 옵션 필터
  const allSubCategories = DUMMY_CATEGORIES.filter((cat) => cat.level === 'sub')
  // 소분류 옵션 필터
  const allDetailCategories = DUMMY_CATEGORIES.filter(
    (cat) => cat.level === 'detail'
  )

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mainRef.current && !mainRef.current.contains(event.target as Node)) {
        setIsMainOpen(false)
      }
      if (subRef.current && !subRef.current.contains(event.target as Node)) {
        setIsSubOpen(false)
      }
      if (
        detailRef.current &&
        !detailRef.current.contains(event.target as Node)
      ) {
        setIsDetailOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 선택된 카테고리
  const selectedMainCategory = allMainCategories.find(
    (cat) => cat.id === mainCategoryId
  )
  const selectedSubCategory = allSubCategories.find(
    (cat) => cat.id === subCategoryId
  )
  const selectedDetailCategory = allDetailCategories.find(
    (cat) => cat.id === detailCategoryId
  )

  return (
    <div className="flex w-full gap-3">
      {/* 대분류 */}
      <div ref={mainRef} className="relative flex-1">
        <button
          type="button"
          onClick={() => setIsMainOpen(!isMainOpen)}
          className="select_button"
        >
          <span className={selectedMainCategory ? '' : 'text-[#9CA3AF]'}>
            {selectedMainCategory?.name || '대분류 선택'}
          </span>
          <SelectArrowIcon
            className={`transition-transform ${isMainOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isMainOpen && (
          <ul className="select_option">
            {allMainCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => {
                    onMainCategoryChange(cat.id)
                    onSubCategoryChange(null)
                    onDetailCategoryChange(null)
                    setIsMainOpen(false)
                  }}
                  className={`select_option_item flex items-center justify-between ${
                    mainCategoryId === cat.id
                      ? 'font-semibold text-[#6201e0]'
                      : 'text-[#121212]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {mainCategoryId === cat.id && (
                    <SelectCheckIcon className="h-4 w-4" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 중분류 */}
      <div ref={subRef} className="relative flex-1">
        <button
          type="button"
          onClick={() => mainCategoryId && setIsSubOpen(!isSubOpen)}
          disabled={!mainCategoryId}
          className={`select_button ${
            mainCategoryId
              ? 'cursor-pointer bg-white text-[#374151] hover:border-[#9CA3AF]'
              : 'cursor-not-allowed bg-gray-100 text-[#9CA3AF] opacity-60'
          }`}
        >
          <span className={selectedSubCategory ? '' : 'text-[#9CA3AF]'}>
            {selectedSubCategory?.name || '중분류 선택'}
          </span>
          <SelectArrowIcon
            className={`transition-transform ${isSubOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isSubOpen && mainCategoryId && (
          <ul className="select_option">
            {allSubCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSubCategoryChange(cat.id)
                    onDetailCategoryChange(null)
                    setIsSubOpen(false)
                  }}
                  className={`select_option_item flex items-center justify-between ${
                    subCategoryId === cat.id
                      ? 'font-semibold text-[#6201e0]'
                      : 'text-[#121212]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {subCategoryId === cat.id && (
                    <SelectCheckIcon className="h-4 w-4" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 소분류 */}
      <div ref={detailRef} className="relative flex-1">
        <button
          type="button"
          onClick={() => subCategoryId && setIsDetailOpen(!isDetailOpen)}
          disabled={!subCategoryId}
          className={`select_button ${
            subCategoryId
              ? 'cursor-pointer bg-white text-[#374151] hover:border-[#9CA3AF]'
              : 'cursor-not-allowed bg-gray-100 text-[#9CA3AF] opacity-60'
          }`}
        >
          <span className={selectedDetailCategory ? '' : 'text-[#9CA3AF]'}>
            {selectedDetailCategory?.name || '소분류 선택'}
          </span>
          <SelectArrowIcon
            className={`transition-transform ${
              isDetailOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isDetailOpen && subCategoryId && (
          <ul className="select_option">
            {allDetailCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => {
                    onDetailCategoryChange(cat.id)
                    setIsDetailOpen(false)
                  }}
                  className={`select_option_item flex items-center justify-between ${
                    detailCategoryId === cat.id
                      ? 'font-semibold text-[#6201e0]'
                      : 'text-[#121212]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {detailCategoryId === cat.id && (
                    <SelectCheckIcon className="h-4 w-4" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

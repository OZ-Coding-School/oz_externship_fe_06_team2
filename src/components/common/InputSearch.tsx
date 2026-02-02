import { useState, useEffect } from 'react'
import SearchIcon from '@/assets/images/svg/Search.svg?react'
import SearchClearIcon from '@/assets/images/svg/SearchClear.svg?react'

interface InputSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function InputSearch({
  value,
  onChange,
  placeholder = '질문 검색',
  className = '',
}: InputSearchProps) {
  // 로컬 입력 상태 (타이핑 중)
  const [localValue, setLocalValue] = useState(value)

  // value prop이 변경되면 localValue도 동기화
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleSearch = () => {
    onChange(localValue)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={`relative w-full max-w-[472px] ${className}`}>
      <button
        type="button"
        onClick={handleSearch}
        className="absolute top-1/2 left-[20px] -translate-y-1/2 transition-opacity hover:opacity-70"
      >
        <SearchIcon />
      </button>

      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`h-[48px] w-full rounded-full border border-[#E5E7EB] bg-[#FAFAFA] pr-[40px] pl-[40px] text-[#222] transition-all outline-none placeholder:text-[#ADADAD] focus:border-[#6201E0] focus:ring-1 focus:ring-[#6201E0] ${localValue ? 'border-[#6201E0]' : ''} `}
      />

      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1/2 right-[20px] -translate-y-1/2 transition-opacity hover:opacity-70"
        >
          <SearchClearIcon />
        </button>
      )}
    </div>
  )
}

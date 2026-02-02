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
  const handleClear = () => {
    onChange('')
  }

  return (
    <div className={`relative w-full max-w-[472px] ${className}`}>
      <div className="absolute top-1/2 left-[20px] -translate-y-1/2">
        <SearchIcon />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-[48px] w-full rounded-full border border-[#E5E7EB] bg-[#FAFAFA] pr-[40px] pl-[40px] text-[#222] transition-all outline-none placeholder:text-[#ADADAD] focus:border-[#6201E0] focus:ring-1 focus:ring-[#6201E0] ${value ? 'border-[#6201E0]' : ''} `}
      />

      {value && (
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

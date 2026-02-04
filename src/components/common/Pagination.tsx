import Pagi_first from '@/assets/images/svg/Pagi_first.svg?react'
import Pagi_prev from '@/assets/images/svg/Pagi_prev.svg?react'
import Pagi_next from '@/assets/images/svg/Pagi_next.svg?react'
import Pagi_last from '@/assets/images/svg/Pagi_last.svg?react'
import Pagi_first_disabled from '@/assets/images/svg/Pagi_first_disabled.svg?react'
import Pagi_prev_disabled from '@/assets/images/svg/Pagi_prev_disabled.svg?react'
import Pagi_next_disabled from '@/assets/images/svg/Pagi_next_disabled.svg?react'
import Pagi_last_disabled from '@/assets/images/svg/Pagi_last_disabled.svg?react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="mt-10 flex justify-center">
      <ul className="pagination flex items-center gap-[4px]">
        <li className="pagi_control">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={isFirstPage}
          >
            {isFirstPage ? <Pagi_first_disabled /> : <Pagi_first />}
          </button>
        </li>

        <li className="pagi_control">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={isFirstPage}
          >
            {isFirstPage ? <Pagi_prev_disabled /> : <Pagi_prev />}
          </button>
        </li>

        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              type="button"
              className={`pagi_item ${currentPage === num ? 'active' : ''}`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </button>
          </li>
        ))}

        <li className="pagi_control">
          <button
            type="button"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={isLastPage}
          >
            {isLastPage ? <Pagi_next_disabled /> : <Pagi_next />}
          </button>
        </li>

        <li className="pagi_control">
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={isLastPage}
          >
            {isLastPage ? <Pagi_last_disabled /> : <Pagi_last />}
          </button>
        </li>
      </ul>
    </nav>
  )
}

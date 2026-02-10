import InputSearch from '@/components/common/InputSearch'
import PencilIcon from '@/assets/images/svg/Pencil.svg?react'
import { Link } from 'react-router'
import type { useQnaListFilters } from '@/hooks/useQnaListFilters'
import { useAuthStore } from '@/store'

interface ListHeaderProps {
  //useQnaListFilters 훅의 반환 타입을 그대로 상속받음
  filters: ReturnType<typeof useQnaListFilters>
}

export default function ListHeader({ filters }: ListHeaderProps) {
  const { searchQuery, setSearchQuery } = filters
  const userInfo = useAuthStore((state) => state.userInfo)

  return (
    <section className="list_header">
      <h2 className="mb-[32px] text-[32px] font-bold text-[#121212]">
        질의응답
      </h2>
      <div className="flex-center-between mb-[52px]">
        <InputSearch value={searchQuery} onChange={setSearchQuery} />
        {userInfo && (
          <Link to="/qnacreate" type="button" className="icon_button bg">
            <PencilIcon />
            질문하기
          </Link>
        )}
      </div>
    </section>
  )
}

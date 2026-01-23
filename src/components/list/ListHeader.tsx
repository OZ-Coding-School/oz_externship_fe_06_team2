import InputSearch from '@/components/common/InputSearch'
import PencilIcon from '@/assets/images/svg/Pencil.svg?react'
import { Link } from 'react-router'

export default function ListHeader() {
  return (
    <section className="list_header">
      <h2 className="mb-[32px] text-[32px] font-bold text-[#121212]">
        질의응답
      </h2>
      <div className="flex-center-between mb-[52px]">
        <InputSearch />
        <Link to="/qnacreate" type="button" className="icon_button bg">
          <PencilIcon />
          질문하기
        </Link>
      </div>
    </section>
  )
}

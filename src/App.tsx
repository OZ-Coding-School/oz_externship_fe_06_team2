import '@/App.css'
import Button from '@/components/Button'
import FilterIcon from '@/assets/images/svg/Filter.svg?react'
import SearchIcon from '@/assets/images/svg/Search.svg?react'
import PencilIcon from '@/assets/images/svg/Pencil.svg?react'
import SortingIcon from '@/assets/images/svg/Sorting.svg?react'
function App() {
  return (
    <>
      <Button />
      <FilterIcon />
      <SearchIcon />
      <button
        type="button"
        className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white"
      >
        <PencilIcon />
        <span>수정</span>
      </button>
      <SortingIcon />
      <p className="text-[32px] font-bold text-[#121212]">질의응답</p>
      <p className="text-[32px] font-bold text-[#121212]">print</p>
    </>
  )
}

export default App

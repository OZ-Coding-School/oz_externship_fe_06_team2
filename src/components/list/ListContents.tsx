import type { QnaItem } from '@/types'
import TabMenu from '@/components/list/TabMenu'
import ListItems from '@/components/list/ListItems'

interface ListContentsProps {
  items: QnaItem[]
  activeTab: string
  setActiveTab: (tab: string) => void
  sortOrder: string
  setSortOrder: (order: string) => void
  mainCategoryId: number | null
  subCategoryId: number | null
  detailCategoryId: number | null
  onMainCategoryChange: (id: number | null) => void
  onSubCategoryChange: (id: number | null) => void
  onDetailCategoryChange: (id: number | null) => void
}

export default function ListContents({
  items,
  activeTab,
  setActiveTab,
  sortOrder,
  setSortOrder,
  mainCategoryId,
  subCategoryId,
  detailCategoryId,
  onMainCategoryChange,
  onSubCategoryChange,
  onDetailCategoryChange,
}: ListContentsProps) {
  console.log(items)

  return (
    <>
      <TabMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        mainCategoryId={mainCategoryId}
        subCategoryId={subCategoryId}
        detailCategoryId={detailCategoryId}
        onMainCategoryChange={onMainCategoryChange}
        onSubCategoryChange={onSubCategoryChange}
        onDetailCategoryChange={onDetailCategoryChange}
      />
      <ul>
        {items.map((item) => (
          <ListItems key={item.id} item={item} />
        ))}
      </ul>
    </>
  )
}

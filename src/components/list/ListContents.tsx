import type { QnaItem } from '@/types'
import TabMenu from '@/components/list/TabMenu'
import { useState } from 'react'

import ListItems from '@/components/list/ListItems'
interface ListContentsProps {
  items: QnaItem[]
}

export default function ListContents({ items }: ListContentsProps) {
  const [activeTab, setActiveTab] = useState('전체보기')
  const [sortOrder, setSortOrder] = useState('최신순')
  console.log(items)
  return (
    <>
      <TabMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <ListItems key={item.id} item={item} />
        ))}
      </ul>
    </>
  )
}

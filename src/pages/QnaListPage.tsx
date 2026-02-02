import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import ListContents from '@/components/list/ListContents'
import ListHeader from '@/components/list/ListHeader'
import { fetchQnaList } from '@/hooks/FetchQnaList'
import Loading from '@/components/common/Loading'
import Error from '@/pages/Error'

export default function QnaListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('전체보기')
  const [sortOrder, setSortOrder] = useState('최신순')
  const [mainCategoryId, setMainCategoryId] = useState<number | null>(null)
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null)
  const [detailCategoryId, setDetailCategoryId] = useState<number | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['qnaList', searchQuery, activeTab, sortOrder, detailCategoryId],
    queryFn: () =>
      fetchQnaList({
        search: searchQuery,
        tab: activeTab,
        sortOrder,
        detailCategoryId,
      }),
  })

  //  isLoading, isError 추후 작업
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <Error />
  }
  return (
    <div className="inner">
      <ListHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {data && (
        <ListContents
          items={data.results}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          mainCategoryId={mainCategoryId}
          subCategoryId={subCategoryId}
          detailCategoryId={detailCategoryId}
          onMainCategoryChange={setMainCategoryId}
          onSubCategoryChange={setSubCategoryId}
          onDetailCategoryChange={setDetailCategoryId}
        />
      )}
    </div>
  )
}

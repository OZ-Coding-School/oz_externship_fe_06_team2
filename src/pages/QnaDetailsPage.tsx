import DetailsHeader from '@/components/details/DetailsHeader'
import DetailsContents from '@/components/details/DetailsContents'
import DetailsWriter from '@/components/details/DetailsWriter'
import DetailsAnswerList from '@/components/details/DetailsAnswerList'
export default function QnaDetailsPage() {
  return (
    <div className="inner">
      <DetailsHeader />
      <DetailsContents />
      <DetailsWriter />
      <DetailsAnswerList />
    </div>
  )
}

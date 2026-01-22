import IconButton from '@/components/IconButton'
import LinkShareIcon from '@/assets/images/svg/Link-share.svg?react'
export default function DetailsContents() {
  return (
    <section className="details_content">
      <div className="editor pb-[24px]">에디터내용이들어감</div>
      <IconButton className="ml-auto" style="border">
        <LinkShareIcon />
        공유하기
      </IconButton>
    </section>
  )
}

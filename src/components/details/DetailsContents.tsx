import LinkShareIcon from '@/assets/images/svg/Link-share.svg?react'
export default function DetailsContents() {
  return (
    <section className="details_content">
      <div className="editor pb-[24px]">에디터내용이들어감</div>
      <button type="button" className="icon_button ml-auto border">
        <LinkShareIcon />
        공유하기
      </button>
    </section>
  )
}

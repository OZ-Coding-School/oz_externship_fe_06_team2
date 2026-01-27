import LinkShareIcon from '@/assets/images/svg/Link-share.svg?react'
interface Props {
  content: string
}
export default function DetailsContents({ content }: Props) {
  return (
    <section className="details_content">
      <div className="editor pb-[24px]">{content}</div>
      <button type="button" className="icon_button ml-auto border">
        <LinkShareIcon />
        공유하기
      </button>
    </section>
  )
}

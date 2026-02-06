import LinkShareIcon from '@/assets/images/svg/Link-share.svg?react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MARKDOWN_COMPONENTS } from '@/constants/markdown'

interface Props {
  content: string
}

export default function DetailsContents({ content }: Props) {
  return (
    <section className="details_content">
      <div className="editor pb-[24px]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={MARKDOWN_COMPONENTS}
        >
          {content}
        </ReactMarkdown>
      </div>
      <button type="button" className="icon_button ml-auto border">
        <LinkShareIcon />
        공유하기
      </button>
    </section>
  )
}

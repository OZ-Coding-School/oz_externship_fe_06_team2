import LinkShareIcon from '@/assets/images/svg/Link-share.svg?react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
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
          rehypePlugins={[rehypeRaw]}
          components={MARKDOWN_COMPONENTS}
        >
          {content}
        </ReactMarkdown>
      </div>
      <button
        type="button"
        className="icon_button ml-auto border"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          alert('URL을 복사했습니다.')
        }}
      >
        <LinkShareIcon />
        공유하기
      </button>
    </section>
  )
}

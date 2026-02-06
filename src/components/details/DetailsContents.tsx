import LinkShareIcon from '@/assets/images/svg/Link-share.svg?react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

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
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="my-4 border-b pb-2 text-2xl font-bold"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="my-3 text-xl font-bold" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="my-2 text-lg font-bold" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="my-2 list-inside list-disc pl-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="my-2 list-inside list-decimal pl-2" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="my-2 border-l-4 border-gray-300 bg-gray-50 py-1 pl-4 text-gray-600 italic"
                {...props}
              />
            ),
            a: ({ node, ...props }) => (
              <a
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            img: ({ node, ...props }) => {
              if (!props.src || props.src.trim() === '') return null
              return (
                <img
                  className="h-auto max-w-full rounded border border-gray-100 shadow-sm"
                  {...props}
                />
              )
            },
            code: ({ node, ...props }) => (
              <code
                className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-red-500"
                {...props}
              />
            ),
            pre: ({ node, ...props }) => (
              <pre
                className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-white"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="my-2 leading-relaxed" {...props} />
            ),
            span: ({ node, ...props }) => <span {...props} />,
            div: ({ node, ...props }) => <div {...props} />,
          }}
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

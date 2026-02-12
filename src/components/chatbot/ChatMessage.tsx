import type { ChatMessage as ChatMessageType } from "./types";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { MARKDOWN_COMPONENTS } from '@/constants/markdown';

type ChatMessageProps = {
    message: ChatMessageType;
};

export default function ChatMessage({ message }: ChatMessageProps) {
    return (
        <div
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${message.role === "user"
                ? "ml-auto bg-gradient-to-br from-purple-600 to-purple-700 text-white"
                : "mr-auto bg-gray-100 text-gray-800"
                }`}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    ...MARKDOWN_COMPONENTS,
                    // 사용자 메시지는 흰색 텍스트로 보이도록 스타일 조정이 필요할 수 있음
                    p: ({ node, ...props }) => <p className={`whitespace-pre-wrap ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`} {...props} />
                }}
            >
                {message.text}
            </ReactMarkdown>
        </div>
    );
}


import { useQuery } from '@tanstack/react-query'
import { getAiAnswer } from '@/api/qnaAnswers'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { MARKDOWN_COMPONENTS } from '@/constants/markdown'

import { useChatStore } from '@/store/chatStore'

interface Props {
    questionId: number
}

export default function AiAnswerSection({ questionId }: Props) {

    const { data, isLoading, error } = useQuery({
        queryKey: ['aiAnswer', questionId],
        queryFn: () => getAiAnswer(questionId),
        retry: 1,
    })

    // 챗봇 전역 상태
    const { setOpen } = useChatStore();

    return (
        <div className="mb-8 mt-8">
            <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-xl">
                    🤖
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI 답변</h3>
                <span className="rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-600">
                    BETA
                </span>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-8 rounded-2xl bg-purple-50 border-2 border-purple-100">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
                </div>
            ) : (
                <>
                    {/* AI 답변 박스 - 큰 스타일 */}
                    <div className="rounded-2xl bg-purple-50 p-6 border-2 border-purple-100">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-xl flex-shrink-0">
                                🤖
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="text-sm font-semibold text-purple-900">AI OZ</h4>
                                </div>
                                <div className="leading-relaxed text-gray-800 text-sm">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={MARKDOWN_COMPONENTS}
                                    >
                                        {data?.output ||
                                            ((error as any)?.response?.status === 409
                                                ? "이미 AI 답변이 생성되었습니다.\n\n궁금한 점이 있다면 아래 **'추가 질문하기'** 버튼을 통해 질문해 주세요! 🤖"
                                                : (error ? 'AI 답변을 불러올 수 없습니다.' : '답변을 기다리는 중입니다...'))}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>

                        {/* 추가 질문하기 버튼 */}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setOpen(true)}
                                className="rounded-full bg-[#6200EE] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5000C8]"
                            >
                                추가 질문하기
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

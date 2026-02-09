
import { useQuery } from '@tanstack/react-query'
import { getAiAnswer } from '@/api/qnaAnswers'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { MARKDOWN_COMPONENTS } from '@/constants/markdown'
import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'

interface Props {
    questionId: number
}

export default function AiAnswerSection({ questionId }: Props) {
    const { data, isLoading, refetch, isError, error } = useQuery({
        queryKey: ['aiAnswer', questionId],
        queryFn: () => getAiAnswer(questionId),
        retry: 1,
    })

    // 에러 메시지 상태 관리
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        if (isError && error) {
            console.error('AI Answer API Error:', error)

            if (isAxiosError(error) && error.response?.data?.error_detail) {
                setErrorMessage(error.response.data.error_detail)
            } else {
                setErrorMessage('AI 답변을 불러오는 중 오류가 발생했습니다.')
            }
        } else {
            setErrorMessage('')
        }
    }, [isError, error])

    const handleRegenerate = () => {
        refetch()
    }

    // if (isError) return null

    return (
        <div className="mb-8 mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-xl">
                    🤖
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI 답변</h3>
                <span className="rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-600">
                    BETA
                </span>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="leading-relaxed text-gray-700">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={MARKDOWN_COMPONENTS}
                            >
                                {data?.output || errorMessage || 'AI 답변을 불러올 수 없습니다.'}
                            </ReactMarkdown>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={handleRegenerate}
                                className="flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-100 hover:text-purple-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                    <path d="M3 3v5h5" />
                                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                    <path d="M16 21h5v-5" />
                                </svg>
                                답변 재생성
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

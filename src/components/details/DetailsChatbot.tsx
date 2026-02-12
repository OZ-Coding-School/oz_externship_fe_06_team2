
import { useQuery } from '@tanstack/react-query'
import { getAiAnswer } from '@/api/qnaAnswers'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { MARKDOWN_COMPONENTS } from '@/constants/markdown'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store'
import { useChatbot } from '@/hooks/useChatbot'

interface Props {
    questionId: number
}

export default function AiAnswerSection({ questionId }: Props) {
    const { data, isLoading } = useQuery({
        queryKey: ['aiAnswer', questionId],
        queryFn: () => getAiAnswer(questionId),
        retry: 1,
    })

    // 챗봇 상태 관리 (useChatbot 훅 사용)
    const { messages, session: { sessionId }, isLoading: isSending, createSession, sendMessage, error } = useChatbot();

    // 로컬 상태 (UI 제어용)
    const [inputText, setInputText] = useState('')
    const [showInput, setShowInput] = useState(false)
    const accessToken = useAuthStore((state) => state.accessToken)

    // 챗봇 세션 생성
    useEffect(() => {
        const initSession = async () => {
            if (!accessToken || sessionId) return // 이미 세션이 있거나 토큰이 없으면 스킵

            try {
                await createSession({
                    question: `QnA ${questionId}번 질문에 대한 추가 질문`,
                    title: '추가 질문',
                    using_model: 'Gemini',
                })
                console.log('✅ 챗봇 세션 생성 성공')
            } catch (error) {
                console.error('챗봇 세션 생성 실패:', error)
            }
        }

        initSession()
    }, [questionId, accessToken, createSession, sessionId]) // sessionId 의존성 제거하여 무한 루프 방지

    const handleSendMessage = async () => {
        if (!inputText.trim() || !sessionId || isSending) return

        const text = inputText.trim()
        setInputText('')
        await sendMessage(text)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

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
                                        {data?.output || error || 'AI 답변을 불러올 수 없습니다.'}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>

                        {/* 추가 질문하기 버튼 */}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setShowInput(true)}
                                className="rounded-full bg-[#6200EE] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5000C8]"
                            >
                                추가 질문하기
                            </button>
                        </div>
                    </div>

                    {/* 추가 질문하기 섹션 */}
                    {accessToken && (
                        <div className="pt-4 mt-4">
                            {showInput && (
                                <div className="rounded-2xl bg-white p-6 border-2 border-gray-200">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3">💬 추가 질문하기</h4>

                                    {/* 대화 내역 */}
                                    {messages.length > 0 && (
                                        <div className="mb-4 max-h-60 overflow-y-auto space-y-3">
                                            {messages.map((msg, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === 'user'
                                                            ? 'bg-purple-600 text-white'
                                                            : 'bg-gray-100 text-gray-800'
                                                            }`}
                                                    >
                                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* 입력 필드 */}
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="추가 질문을 입력하세요..."
                                            disabled={!sessionId || isSending}
                                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={!inputText.trim() || !sessionId || isSending}
                                            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            {isSending ? '전송 중...' : '전송'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

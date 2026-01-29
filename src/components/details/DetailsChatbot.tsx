import { useState } from 'react';

export default function AiAnswerSection() {
    const [isLoading, setIsLoading] = useState(false);

    const handleRegenerate = () => {
        setIsLoading(true);
        // Mock loading for 1 second
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="mt-8 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-xl">
                    🤖
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI 답변</h3>
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">BETA</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                            안녕하세요! 질문해주신 내용에 대해 AI가 분석한 답변입니다.
                            <br /><br />
                            <strong>핵심 요약:</strong><br />
                            문제를 해결하기 위해서는 입력 값을 검증하는 로직을 추가해야 합니다.
                            특히 `null` 체크와 범위 확인이 중요합니다.
                            <br /><br />
                            추가적으로 궁금한 점이 있다면 언제든지 물어보고,
                            아래 버튼을 눌러 답변을 재생성할 수 있습니다.
                        </p>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={handleRegenerate}
                                className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    );
}

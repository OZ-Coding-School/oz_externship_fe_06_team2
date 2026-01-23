import type { ChatMessage as ChatMessageType } from "./types";
import ChatMessage from "./ChatMessage";

type ChatMessageListProps = {
    messages: ChatMessageType[];
    onSendSuggestion: (text: string) => void;
};

export default function ChatMessageList({ messages, onSendSuggestion }: ChatMessageListProps) {
    return (
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
            {messages.length === 0 && (
                <div className="space-y-3">
                    <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            🤖
                        </div>
                        <p className="text-gray-700 mt-1">
                            안녕하세요! 무엇을 도와드릴까요?
                        </p>
                    </div>
                    <button
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                        onClick={() => onSendSuggestion("AI OZ는 어떤 서비스인가요?")}
                    >
                        AI OZ는 어떤 서비스인가요?
                    </button>
                </div>
            )}

            {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
            ))}

            {messages.length > 0 && (
                <button
                    onClick={() => { }}
                    className="text-sm text-purple-600 underline hover:text-purple-700 font-medium"
                >
                    추가 질문하기
                </button>
            )}
        </div>
    );
}

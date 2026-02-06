import type { ChatMessage } from "./types";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

type ChatWindowProps = {
    messages: ChatMessage[];
    onClose: () => void;
    onSendMessage: (text: string) => void;
    isLoading?: boolean;
    sessionId?: number | null;
};

export default function ChatWindow({ messages, onClose, onSendMessage, isLoading, sessionId }: ChatWindowProps) {
    return (
        <div className="w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 relative">
            <ChatHeader onClose={onClose} />

            {/* 세션 생성 중 로딩 표시 */}
            {!sessionId && isLoading && (
                <div className="absolute inset-0 bg-white/50 z-10 flex flex-col items-center justify-center gap-3 pt-14">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    <p className="text-sm text-gray-500 font-medium">채팅 세션 생성 중...</p>
                </div>
            )}

            <ChatMessageList
                messages={messages}
                onSendSuggestion={onSendMessage}
            />

            {/* 답변 생성 중 로딩 표시 (메시지 리스트 아래) */}
            {sessionId && isLoading && (
                <div className="px-5 py-2 flex items-center gap-2 text-xs text-purple-600 font-medium bg-purple-50">
                    <div className="flex gap-1">
                        <span className="w-1 h-1 bg-purple-600 rounded-full animate-bounce"></span>
                        <span className="w-1 h-1 bg-purple-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1 h-1 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                    AI가 답변을 생각하고 있습니다...
                </div>
            )}

            <ChatInput onSend={onSendMessage} disabled={isLoading || !sessionId} />
        </div>
    );
}
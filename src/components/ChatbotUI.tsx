import { useState } from "react";
// import type { ChatMessage, ChatSession } from "./chatbot/types";
import ChatFloatingButton from "./chatbot/ChatFloatingButton";
import ChatWindow from "./chatbot/ChatWindow";
// import { chatbotApi } from "../api/chatbot";
import { useChatbot } from "../hooks/useChatbot";

import { useAuthStore } from "../store";

export default function ChatbotUI() {
    const [open, setOpen] = useState(false);
    const { messages, setMessages, session, isLoading, createSession, sendMessage } = useChatbot();
    const accessToken = useAuthStore((state) => state.accessToken);

    const handleOpen = async () => {
        let currentToken = accessToken;
        setOpen(true);

        if (!currentToken) {
            setMessages([{ role: "bot", text: "로그인이 필요합니다." }]);
            return;
        }

        if (!session.sessionId) {
            try {
                await createSession({
                    question: "1",
                    title: "새 대화",
                    using_model: "Gemini",
                });
            } catch (error: any) {
                const errorMsg = error.response?.data?.detail || error.message;
                setMessages([{ role: "bot", text: `세션 생성 실패: ${errorMsg}` }]);
            }
        }
    };

    const handleClose = async () => {
        setOpen(false);
        // await deleteSession(); // 필요한 경우 세션 삭제
    };

    const handleSendMessage = async (text: string) => {
        await sendMessage(text);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!open && <ChatFloatingButton onClick={handleOpen} />}
            {open && (
                <ChatWindow
                    messages={messages}
                    onClose={handleClose}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    sessionId={session.sessionId}
                />
            )}
        </div>
    );
}
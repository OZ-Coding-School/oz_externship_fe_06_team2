import { useState } from "react";
import type { ChatMessage, ChatSession } from "./chatbot/types";
import ChatFloatingButton from "./chatbot/ChatFloatingButton";
import ChatWindow from "./chatbot/ChatWindow";
import { chatbotApi } from "../api/chatbot";
import { isLoggedIn } from "../api/api";

// 🔧 테스트용: 스웨거에서 받은 ACCESS token을 여기에 입력하세요
const TEST_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwMzYxMDI5LCJpYXQiOjE3NzAyNzQ2MjksImp0aSI6IjdlNjM3ZjliMzYzZDRhMjI5ZGQ4ODY0ZTYzZTg2YzUzIiwidXNlcl9pZCI6MTB9.Zv1w_k860ye4NYwYRU3aBpfYtvOtqI6NFJVRJ5mrr_o";

export default function ChatbotUI() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [session, setSession] = useState<ChatSession>({ sessionId: null });
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = async () => {
        setOpen(true);

        // 로그인 상태 확인
        if (!isLoggedIn()) {
            setMessages([
                { role: "bot", text: "로그인이 필요합니다. 로그인 후 다시 시도해주세요." }
            ]);
            return;
        }

        // 세션이 없으면 새로 생성
        if (!session.sessionId) {
            try {
                setIsLoading(true);
                console.log("세션 생성 시도 중...");
                const response = await chatbotApi.createSession({
                    question: "1",
                    title: "새 대화",
                    using_model: "Gemini",
                }, TEST_ACCESS_TOKEN);
                console.log("세션 생성 성공:", response);
                setSession({
                    sessionId: response.session_id,
                    title: response.title,
                    usingModel: response.using_model,
                });
            } catch (error) {
                console.error("세션 생성 실패:", error);
                console.error("에러 상세:", (error as any).response?.data || (error as any).message);
                setMessages([
                    { role: "bot", text: "세션 생성에 실패했습니다. 잠시 후 다시 시도해주세요." }
                ]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleClose = async () => {
        setOpen(false);

        // 세션 삭제 (선택사항: 닫을 때 세션을 유지하려면 이 부분을 제거)
        if (session.sessionId) {
            try {
                await chatbotApi.deleteSession(session.sessionId);
                setSession({ sessionId: null });
                setMessages([]); // 메시지도 초기화
            } catch (error) {
                console.error("세션 삭제 실패:", error);
            }
        }
    };

    const handleSendMessage = async (text: string) => {
        // 사용자 메시지 추가
        setMessages((prev) => [...prev, { role: "user", text }]);

        // 세션이 없으면 메시지를 보낼 수 없음
        if (!session.sessionId) {
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "로그인이 되지 않았습니다. 로그인 후 다시 시도해주세요." },
            ]);
            return;
        }

        try {
            setIsLoading(true);
            // 실제 AI 챗봇 API 호출
            const aiResponse = await chatbotApi.sendMessage(session.sessionId, text, TEST_ACCESS_TOKEN);

            setMessages((prev) => [
                ...prev,
                { role: "bot", text: aiResponse },
            ]);
        } catch (error) {
            console.error("챗봇 메시지 전송 실패:", error);
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요." },
            ]);
        } finally {
            setIsLoading(false);
        }
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
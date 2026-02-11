import { useState, useEffect } from "react";
import type { ChatMessage, ChatSession } from "./chatbot/types";
import ChatFloatingButton from "./chatbot/ChatFloatingButton";
import ChatWindow from "./chatbot/ChatWindow";
import { chatbotApi } from "../api/chatbot";

import { useAuthStore } from "../store";

// 🔧 테스트용: 로컬 환경에서 쿠키가 안 잡힐 때 사용 (필요시 토큰 갱신)
const TEST_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwODc5MTQxLCJpYXQiOjE3NzA3OTI3NDEsImp0aSI6IjVkZWNhOTgwMWYxMDQ0OTBiNTdmMTgyNzRmMmMwYmY2IiwidXNlcl9pZCI6MTB9.q6NyT-zfnbvsPXTCE3KximhquUl74g2md1-yDBXSltU";

export default function ChatbotMain() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [session, setSession] = useState<ChatSession>({ sessionId: null });
    const [isLoading, setIsLoading] = useState(false);

    // 훅을 사용하여 상태 변경 감지 (리렌더링 유발)
    const accessToken = useAuthStore((state) => state.accessToken);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    // 컴포넌트 마운트 시 테스트 토큰 자동 주입 (로컬 개발용)
    useEffect(() => {
        if (!accessToken && TEST_ACCESS_TOKEN) {
            console.error("🛠️ ChatbotUI 마운트: 테스트 토큰 자동 주입");
            setAccessToken(TEST_ACCESS_TOKEN);
        }
    }, [accessToken, setAccessToken]);

    const handleOpen = async () => {
        // 로컬 개발 환경 대응: 토큰이 없으면 테스트 토큰 즉시 사용 (Double Check)
        let currentToken = accessToken;
        if (!currentToken && TEST_ACCESS_TOKEN) {
            console.error("⚠️ 클릭 시 토큰 없음 -> 테스트 토큰 강제 주입");
            setAccessToken(TEST_ACCESS_TOKEN);
            currentToken = TEST_ACCESS_TOKEN;
        }

        console.error("chatbot open - token:", currentToken ? `${currentToken.substring(0, 10)}...` : "없음");
        setOpen(true);

        // 로그인 상태 확인
        if (!currentToken) {
            setMessages([
                { role: "bot", text: "로그인이 필요합니다. (토큰 없음)" }
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
                });
                console.log("세션 생성 성공:", response);
                setSession({
                    sessionId: response.id, // session_id -> id 로 수정
                    title: response.title,
                    usingModel: response.using_model,
                });
            } catch (error: any) {
                console.error("세션 생성 실패:", error);
                const errorMsg = error.response?.data?.detail || error.response?.data?.message || error.message;
                console.error("에러 상세:", error.response?.data || error.message);
                setMessages([
                    { role: "bot", text: `세션 생성에 실패했습니다. (${errorMsg})` }
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
            // 실제 AI 챗봇 API 호출 (axios interceptor가 자동으로 토큰 추가)
            const aiResponse = await chatbotApi.sendMessage(session.sessionId, text);

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
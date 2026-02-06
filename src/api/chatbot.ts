import { api } from './api'

// =============================
// Chatbot API Types
// =============================

export interface CreateChatbotSessionRequest {
    question?: string
    title?: string
    using_model?: string
}

export interface CreateChatbotSessionResponse {
    id: number
    session_id?: number
    user_id: number
    question?: string
    title?: string
    using_model?: string
    created_at: string
    updated_at: string
}

// =============================
// Chatbot API Functions
// =============================

/**
 * 챗봇 기능으로 세션을 생성합니다.
 * POST /api/v1/chatbot/sessions/
 */
export async function createChatbotSession(
    data: CreateChatbotSessionRequest,
    token?: string
): Promise<CreateChatbotSessionResponse> {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    // 프록시 문제 확인을 위해 임시로 절대 경로 사용
    const res = await api.post<CreateChatbotSessionResponse>(
        'https://api.ozcodingschool.site/api/v1/chatbot/sessions/',
        data,
        { headers }
    )
    return res.data

}

/**
 * 특정 챗봇 세션을 삭제합니다.
 * DELETE /api/v1/chatbot/sessions/{session_id}/
 */
export async function deleteChatbotSession(sessionId: number): Promise<void> {
    await api.delete(`https://api.ozcodingschool.site/api/v1/chatbot/sessions/${sessionId}/`)
}

/**
 * 챗봇에게 메시지를 전송하고 AI 응답을 받습니다.
 * POST /api/v1/chatbot/sessions/{session_id}/messages/
 */
export async function sendChatbotMessage(
    sessionId: number,
    message: string,
    token?: string
): Promise<string> {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const url = `https://api.ozcodingschool.site/api/v1/chatbot/sessions/${sessionId}/completions`;
    console.error("DEBUG: 메시지 전송 URL:", url);

    const res = await api.post<string>(
        url,
        { message },
        { headers, responseType: 'text' }
    )

    // SSE 형식(data: {...})으로 올 경우 처리
    const data = res.data;
    if (typeof data === 'string' && data.startsWith('data: ')) {
        try {
            const jsonStr = data.replace('data: ', '').trim();
            const parsed = JSON.parse(jsonStr);
            return parsed.response || parsed.message || (parsed.error ? `Error: ${parsed.error}` : data);
        } catch (e) {
            return data;
        }
    }

    return typeof data === 'object' ? (data as any).response : data;
}

// =============================
// Chatbot API Object
// =============================

export const chatbotApi = {
    createSession: createChatbotSession,
    deleteSession: deleteChatbotSession,
    sendMessage: sendChatbotMessage,
}

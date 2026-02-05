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
    session_id: number
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
    const res = await api.post<CreateChatbotSessionResponse>(
        '/api/v1/chatbot/sessions/',
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
    await api.delete(`/api/v1/chatbot/sessions/${sessionId}/`)
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
    const res = await api.post<{ response: string }>(
        `/api/v1/chatbot/sessions/${sessionId}/messages/`,
        { message },
        { headers }
    )
    return res.data.response
}

// =============================
// Chatbot API Object
// =============================

export const chatbotApi = {
    createSession: createChatbotSession,
    deleteSession: deleteChatbotSession,
    sendMessage: sendChatbotMessage,
}

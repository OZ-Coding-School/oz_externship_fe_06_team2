import { api } from './api'
import { useAuthStore } from '@/store'

// =============================
// Chatbot API Types
// =============================

export interface CreateChatbotSessionRequest {
  question?: string | number
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
  data: CreateChatbotSessionRequest
): Promise<CreateChatbotSessionResponse> {
  // axios interceptor가 자동으로 Bearer 토큰을 추가합니다
  const res = await api.post<CreateChatbotSessionResponse>(
    'https://api.ozcodingschool.site/api/v1/chatbot/sessions/',
    data
  )
  return res.data
}

/**
 * 특정 챗봇 세션을 삭제합니다.
 * DELETE /api/v1/chatbot/sessions/{session_id}/
 */
export async function deleteChatbotSession(sessionId: number): Promise<void> {
  await api.delete(
    `https://api.ozcodingschool.site/api/v1/chatbot/sessions/${sessionId}/`
  )
}

/**
 * 챗봇에게 메시지를 전송하고 AI 응답을 받습니다.
 * POST /api/v1/chatbot/sessions/{session_id}/completions
 */
export async function sendChatbotMessage(
  sessionId: number,
  message: string
): Promise<string> {
  console.log('🚀 sendChatbotMessage 호출됨 - sessionId:', sessionId, 'message:', message)

  const url = `https://api.ozcodingschool.site/api/v1/chatbot/sessions/${sessionId}/completions`
  console.log('📤 메시지 전송 URL:', url)

  // fetch API를 사용하여 원본 텍스트 응답을 받음
  const accessToken = useAuthStore.getState().accessToken

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ message }),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  // 응답을 텍스트로 읽기
  const data = await response.text()
  console.log('📥 받은 원본 응답 타입:', typeof data)
  console.log('📥 받은 원본 응답:', data)
  console.log('📥 응답 길이:', data.length)
  console.log('📥 data: 포함 여부:', data.includes('data:'))

  if (typeof data === 'string' && data.includes('data:')) {
    console.log('🔍 SSE 파싱 시작...')
    let fullResponse = ''

    // 개행 문자로 분리
    const lines = data.split('\n')
    let lineCount = 0

    for (const line of lines) {
      const trimmed = line.trim()

      // 빈 줄이거나 data: 로 시작하지 않으면 스킵
      if (!trimmed || !trimmed.startsWith('data:')) continue

      lineCount++
      console.log(`🔍 라인 ${lineCount}:`, trimmed)

      // "data: [DONE]" 시그널 처리
      if (trimmed === 'data: [DONE]') {
        console.log('🛑 [DONE] 시그널 감지, 파싱 종료')
        break
      }

      // "data: " 이후의 JSON 추출
      const jsonStr = trimmed.substring(5).trim() // "data:" 제거 (5글자)
      if (!jsonStr) continue

      try {
        const parsed = JSON.parse(jsonStr)
        console.log(`✅ 파싱 성공 ${lineCount}:`, parsed)
        // content, response, message 필드 중 하나를 찾아서 추가
        if (parsed.content) {
          fullResponse += parsed.content
        } else if (parsed.response) {
          fullResponse += parsed.response
        } else if (parsed.message) {
          fullResponse += parsed.message
        }
      } catch (e) {
        console.error('❌ Failed to parse SSE chunk:', jsonStr, e)
      }
    }

    console.log(`🔍 총 ${lineCount}개 라인 처리`)
    console.log('✅ 파싱된 최종 응답:', fullResponse)
    console.log('✅ 최종 응답 길이:', fullResponse.length)
    return fullResponse || data // 파싱 결과가 없으면 원본 반환
  }

  console.log('⚠️ SSE 파싱 조건 불만족, 원본 반환')
  return data
}

// =============================
// Chatbot API Object
// =============================

export const chatbotApi = {
  createSession: createChatbotSession,
  deleteSession: deleteChatbotSession,
  sendMessage: sendChatbotMessage,
}

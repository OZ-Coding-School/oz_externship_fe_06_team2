import { api } from '@/api/api'
import type {
  QnaAnswerBody,
  QnaAnswerResponse,
  AiAnswerResponse,
} from '@/types'
import { BASE_URL } from '@/constants/qna'

export async function QnaAnswer(
  body: QnaAnswerBody,
  id: number
): Promise<QnaAnswerResponse> {
  const res = await api.post<QnaAnswerResponse>(
    `${BASE_URL}questions/${id}/answers`,
    body
  )
  return res.data
}

export async function getAiAnswer(id: number): Promise<AiAnswerResponse> {
  console.log('🔍 [getAiAnswer] Requesting AI answer for question ID:', id)

  try {
    const res = await api.get<AiAnswerResponse>(
      `${BASE_URL}questions/${id}/ai-answer`
    )
    console.log('✅ [getAiAnswer] Success:', res.data)
    return res.data
  } catch (error: any) {
    console.error('❌ [getAiAnswer] Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      requestURL: error.config?.url,
      requestHeaders: error.config?.headers,
    })
    throw error
  }
}


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
  const res = await api.get<AiAnswerResponse>(
    `${BASE_URL}questions/${id}/ai-answer`
  )
  return res.data
}

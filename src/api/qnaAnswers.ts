import { api } from '@/api/api'
import type { QnaAnswerBody, QnaAnswerResponse, AiAnswerResponse } from '@/types'

import { BASE_URL } from '@/constants/qna'
import { useAuthStore } from '@/store'

export async function QnaAnswer(
  body: QnaAnswerBody,
  id: number
): Promise<QnaAnswerResponse> {
  const accessToken = useAuthStore.getState().accessToken
  const res = await api.post<QnaAnswerResponse>(
    `${BASE_URL}questions/${id}/answers`,
    body,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return res.data
}

export async function getAiAnswer(id: number): Promise<AiAnswerResponse> {
  const accessToken = useAuthStore.getState().accessToken
  const res = await api.get<AiAnswerResponse>(
    `${BASE_URL}questions/${id}/ai-answer`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return res.data
}

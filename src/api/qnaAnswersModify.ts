import { api } from '@/api/api'
import { BASE_URL } from '@/constants/qna'
import type { QnaAnswerBody } from '@/types'

export const QnaAnswersModify = async (
  answerId: number,
  body: QnaAnswerBody
) => {
  const response = await api.put(`${BASE_URL}answers/${answerId}`, body)
  return response.data
}

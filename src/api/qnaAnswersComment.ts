import { api } from '@/api/api'
import { BASE_URL } from '@/constants/qna'

export const QnaAnswersComment = async (answerId: number, content: string) => {
  const response = await api.post(`${BASE_URL}answers/${answerId}/comments`, {
    content,
  })
  return response.data
}

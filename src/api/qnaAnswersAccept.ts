import { api } from '@/api/api'
import { BASE_URL } from '@/constants/qna'

export const QnaAnswersAccept = async (answerId: number) => {
  const response = await api.post(`${BASE_URL}answers/${answerId}/accept`)
  return response.data
}

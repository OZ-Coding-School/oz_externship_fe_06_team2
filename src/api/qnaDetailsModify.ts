import { api } from '@/api/api'
import { BASE_URL } from '@/constants/qna'

interface QnaModifyBody {
  title: string
  content: string
  category_id: number
}

export const QnaDetailsModify = async (
  questionId: number,
  body: QnaModifyBody
) => {
  const response = await api.put(`${BASE_URL}questions/${questionId}`, body)
  return response.data
}

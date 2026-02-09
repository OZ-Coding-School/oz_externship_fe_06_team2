import { api } from '@/api/api'
import type { CreateQnaPostBody, CreateQnaPostResponse } from '@/types'
import { BASE_URL } from '@/constants/qna'

export async function QnaCreate(
  body: CreateQnaPostBody
): Promise<CreateQnaPostResponse> {
  const res = await api.post<CreateQnaPostResponse>(
    `${BASE_URL}questions`,
    body
  )
  return res.data
}

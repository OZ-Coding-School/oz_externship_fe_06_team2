import { api } from '../api/api'
import type { CreateQnaPostBody, CreateQnaPostResponse } from '@/types'
import { BASE_URL } from '@/constants/qna'
export async function createQnaPost(
  body: CreateQnaPostBody,
  token: string
): Promise<CreateQnaPostResponse> {
  // const testToken = '테스트토큰값'
  const res = await api.post<CreateQnaPostResponse>(
    `${BASE_URL}questions`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return res.data
}

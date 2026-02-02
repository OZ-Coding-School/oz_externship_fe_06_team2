import { api } from '../api/api'
import type { CreateQnaPostBody, CreateQnaPostResponse } from '@/types'

export async function createQnaPost(
  body: CreateQnaPostBody,
  token: string
): Promise<CreateQnaPostResponse> {
  // const testToken = '테스트토큰값'
  const res = await api.post<CreateQnaPostResponse>(
    'https://api.ozcodingschool.site/api/v1/qna/questions',
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

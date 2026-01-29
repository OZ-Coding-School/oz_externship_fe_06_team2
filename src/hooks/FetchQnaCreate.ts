import { api, getAccessToken } from '../api/api'
import type { CreateQnaPostBody, CreateQnaPostResponse } from '@/types'

export async function createQnaPost(
  body: CreateQnaPostBody,
  token?: string
): Promise<CreateQnaPostResponse> {
  const res = await api.post<CreateQnaPostResponse>(
    'https://api.ozcodingschool.site/api/v1/qna/questions',
    body
    // { headers: { ...withAuth(token) } }
  )
  return res.data
}

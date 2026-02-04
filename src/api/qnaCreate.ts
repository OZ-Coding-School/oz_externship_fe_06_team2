import { api } from '@/api/api'
import type { CreateQnaPostBody, CreateQnaPostResponse } from '@/types'
import { BASE_URL } from '@/constants/qna'
import { useAuthStore } from '@/store'

export async function createQnaPost(
  body: CreateQnaPostBody
): Promise<CreateQnaPostResponse> {
  const accessToken = useAuthStore.getState().accessToken

  const res = await api.post<CreateQnaPostResponse>(
    `${BASE_URL}questions`,
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

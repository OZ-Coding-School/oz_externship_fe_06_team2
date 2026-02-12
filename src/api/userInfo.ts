import { api } from '@/api/api'

export interface UserInfo {
  id: number
  email: string
  nickname: string
  profile_img_url: string | null
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await api.get<UserInfo>(
    'https://api.ozcodingschool.site/api/v1/accounts/me/'
  )
  return response.data
}

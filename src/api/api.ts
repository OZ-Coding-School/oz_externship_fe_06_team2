import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

/** axios 인스턴스 (쿠키 인증 대비: withCredentials) */
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwNDM3NTc4LCJpYXQiOjE3NzAzNTExNjcsImp0aSI6ImQ3YWMxOTExOTMwMDRiZWU4ZTdmMDNjNzE3NWViZDg4IiwidXNlcl9pZCI6MTB9.6yD4w-h05SD-bmSueCB-hXAwSeYkQPjNSyfcVze79H8',
  },
})

/** (옵션) JS로 읽을 수 있는 쿠키일 때만 사용 가능 */
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

/** 로그인 상태 확인 (refreshToken 쿠키 또는 localStorage user 존재 여부) */
export function isLoggedIn(): boolean {
  return (
    getCookie('refreshToken') !== null || localStorage.getItem('user') !== null
  )
}

/** (옵션) Access Token 가져오기 (HttpOnly면 null 나올 수 있음) */
export function getAccessToken(): string | null {
  return getCookie('accessToken')
}

/** 현재 로그인한 사용자 정보 조회 API */
export async function getCurrentUser() {
  const token = getAccessToken()
  const res = await api.get('/api/v1/accounts/me', {
    headers: { ...withAuth(token || undefined) },
  })
  return res.data
}

/** undefined / null 제거 + querystring 생성 */
export function toQuery(params?: Record<string, unknown>) {
  const sp = new URLSearchParams()
  if (!params) return sp
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    sp.set(key, String(value))
  })
  return sp
}

/** Authorization 헤더 주입 (토큰을 JS에서 읽을 수 있을 때만 의미 있음) */
function withAuth(token?: string) {
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}
/**
 * S3 이미지 업로드를 위한 Presigned URL 발급 요청
 * @param fileName - 업로드할 파일명 (예: "example.png")
 * @returns presigned_url, img_url, key
 */
export interface PresignedUrlResponse {
  presigned_url: string
  img_url: string
  key: string
}
export async function getPresignedUrl(
  fileName: string
): Promise<PresignedUrlResponse> {
  const token = getAccessToken()
  const res = await api.put<PresignedUrlResponse>(
    'https://api.ozcodingschool.site/api/v1/qna/answers/presigned-url',
    { file_name: fileName },
    { headers: { ...withAuth(token || undefined) } }
  )
  return res.data
}

/**
 * Presigned URL을 사용하여 S3에 파일 업로드
 * @param presignedUrl - 백엔드에서 발급받은 Presigned URL
 * @param file - 업로드할 파일
 */
export async function uploadToS3(
  presignedUrl: string,
  file: File
): Promise<void> {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  })
}
// =============================
// Community API
// =============================

// export async function createQnaPost(
//   body: CreateQnaPostBody,
//   token?: string
// ): Promise<CreateQnaPostResponse> {
//   const res = await api.post<CreateQnaPostResponse>(
//     '/api/v1/qna/questions',
//     body,
//     { headers: { ...withAuth(token) } }
//   )
//   return res.data
// }

// export const qnaApi = {
//   createPost: createQnaPost,
// }

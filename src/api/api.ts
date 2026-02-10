import axios from 'axios'
import { useAuthStore } from '@/store'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

/** axios 인스턴스 (쿠키 인증 대비: withCredentials) */
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request 인터셉터: 모든 요청에 자동으로 토큰 추가
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 챗봇에서 사용중이라 챗봇 로그인체크 전역상태관리로 수정하고 제거예정
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

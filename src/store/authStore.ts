import { create } from 'zustand'
import type { UserInfo } from '@/api/userInfo'

interface AuthState {
  accessToken: string | null
  userInfo: UserInfo | null
  setAccessToken: (token: string | null) => void
  setUserInfo: (user: UserInfo | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  userInfo: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUserInfo: (user) => set({ userInfo: user }),
  clearAuth: () => set({ accessToken: null, userInfo: null }),
}))

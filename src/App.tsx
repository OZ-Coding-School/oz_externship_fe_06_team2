import '@/App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Layout from '@/components/layout/Layout'
import Loading from '@/components/common/Loading'
import { useEffect } from 'react'
import { api } from '@/api/api'
import { useAuthStore } from '@/store'
import { type UserInfo } from '@/api/userInfo'
const GuidePage = lazy(() => import('@/pages/GuidePage'))
const QnaListPage = lazy(() => import('@/pages/QnaListPage'))
const QnaDetailsPage = lazy(() => import('@/pages/QnaDetailsPage'))
const QnaCreatePage = lazy(() => import('@/pages/QnaCreatePage'))
const QnaModifyPage = lazy(() => import('@/pages/QnaModifyPage'))

function App() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setUserInfo = useAuthStore((state) => state.setUserInfo)

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await api.post(
          'https://api.ozcodingschool.site/api/v1/accounts/me/refresh/'
        )

        // API 응답에서 access_token 추출하여 전역 상태에 저장
        if (response.data?.access_token) {
          setAccessToken(response.data.access_token)

          // 토큰 저장 후 유저 정보 가져오기
          try {
            const userInfo = await api.get<UserInfo>(
              'https://api.ozcodingschool.site/api/v1/accounts/me/'
            )
            setUserInfo(userInfo.data)
          } catch (error) {
            console.error('Failed to fetch user info:', error)
          }
        }
      } catch (error) {
        console.error('Token refresh failed:', error)
      }
    }

    refreshToken()
  }, [setAccessToken, setUserInfo])

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/qna" element={<Layout />}>
            <Route index element={<QnaListPage />} />
            <Route path="/qnadetails/:id" element={<QnaDetailsPage />} />
            <Route path="/qnacreate" element={<QnaCreatePage />} />
            <Route path="/qnamodify/:id" element={<QnaModifyPage />} />
          </Route>
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App

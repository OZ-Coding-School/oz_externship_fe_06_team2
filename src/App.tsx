import '@/App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Layout from '@/components/layout/Layout'
import Loading from '@/components/common/Loading'
import { useEffect } from 'react'
import { api } from '@/api/api'
import { useAuthStore } from '@/store'
const GuidePage = lazy(() => import('@/pages/GuidePage'))
const QnaListPage = lazy(() => import('@/pages/QnaListPage'))
const QnaDetailsPage = lazy(() => import('@/pages/QnaDetailsPage'))
const QnaCreatePage = lazy(() => import('@/pages/QnaCreatePage'))
const QnaUpdatePage = lazy(() => import('@/pages/QnaUpdatePage'))

function App() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await api.post(
          'https://api.ozcodingschool.site/api/v1/accounts/me/refresh/',
          {
            refresh_token: '',
            //테스트할때 스웨거에서 로그인후 refresh_token을 복사해서 사용
          }
        )

        // API 응답에서 access_token 추출하여 전역 상태에 저장
        if (response.data?.access_token) {
          setAccessToken(response.data.access_token)
          console.log('Token refresh successful, access_token saved to store')
        }
      } catch (error) {
        console.error('Token refresh failed:', error)
      }
    }

    refreshToken()
  }, [])
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/qna" element={<QnaListPage />} />
            <Route path="/qnadetails/:id" element={<QnaDetailsPage />} />
            <Route path="/qnacreate" element={<QnaCreatePage />} />
            <Route path="/qnaupdate" element={<QnaUpdatePage />} />
          </Route>
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App

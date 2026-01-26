import '@/App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Layout from '@/components/layout/Layout'

const GuidePage = lazy(() => import('@/pages/GuidePage'))
const QnaListPage = lazy(() => import('@/pages/QnaListPage'))
const QnaDetailsPage = lazy(() => import('@/pages/QnaDetailsPage'))
const QnaCreatePage = lazy(() => import('@/pages/QnaCreatePage'))
const QnaUpdatePage = lazy(() => import('@/pages/QnaUpdatePage'))

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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

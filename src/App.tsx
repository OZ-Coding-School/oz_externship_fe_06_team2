import '@/App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

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
          <Route path="/" element={<QnaListPage />} />
          <Route path="/qna/:id" element={<QnaDetailsPage />} />
          <Route path="/qna/create" element={<QnaCreatePage />} />
          <Route path="/qna/:id/update" element={<QnaUpdatePage />} />
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App

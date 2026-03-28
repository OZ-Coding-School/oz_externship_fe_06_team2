import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
const queryClient = new QueryClient()
async function enableMocking() {
  // VITE_ENABLE_MSW=true 일 때만 MSW 활성화 (개발/배포 공통)
  if (import.meta.env.VITE_ENABLE_MSW !== 'true') {
    return
  }
  const { worker } = await import('./mocks/browser.ts')

  return worker.start({
    onUnhandledRequest: 'bypass', // 핸들러 없는 요청은 실제 서버로 전달
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  )
})

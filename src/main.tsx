import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
const queryClient = new QueryClient()
async function enableMocking() {
  // MSW 항상 활성화 (백엔드 서버 없이 동작)
  const { worker } = await import('./mocks/browser.ts')

  return worker.start({
    onUnhandledRequest: 'warn', // 핸들러 없는 요청은 경고 표시
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

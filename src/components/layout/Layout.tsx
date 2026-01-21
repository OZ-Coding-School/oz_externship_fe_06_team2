import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

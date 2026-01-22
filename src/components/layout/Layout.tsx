import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <Header />
      <main className="my-[108px] min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

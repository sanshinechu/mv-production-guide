import { Outlet } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import { useCloudSync } from '../../hooks/useCloudSync'

export default function AppLayout() {
  // 登入後自動把進度同步到雲端
  useCloudSync()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

import { Outlet } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import ProjectBar from '../Layout/ProjectBar'

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <ProjectBar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

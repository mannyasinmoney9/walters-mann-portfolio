import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CommandPalette from './components/ui/CommandPalette'
import ScrollProgress from './components/ui/ScrollProgress'
import ScrollToTop from './components/ui/ScrollToTop'
import SpotlightLayer from './components/ui/SpotlightLayer'
import Home from './pages/Home'
import AllProjects from './pages/AllProjects'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

function ScrollRestoration() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)

      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="app-aurora" aria-hidden="true" />
      <SpotlightLayer />
      <div className="grain" aria-hidden="true" />

      <ScrollProgress />
      <ScrollRestoration />
      <Navbar onOpenPalette={() => setCommandOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ScrollToTop />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Sidebar } from './components/Sidebar'
import { CoverPage } from './components/CoverPage'
import DashboardPage from './pages/DashboardPage'
import PlanificationPage from './pages/PlanificationPage'
import AchatsPage from './pages/AchatsPage'
import ReceptionPage from './pages/ReceptionPage'
import OperationsPage from './pages/OperationsPage'
import LivraisonPage from './pages/LivraisonPage'
import TableauSIPage from './pages/TableauSIPage'

export default function App() {
  const [showCover, setShowCover] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowCover(false), 7000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-50)' }}>
      <Analytics />
      <AnimatePresence>
        {showCover && <CoverPage />}
      </AnimatePresence>
      <Sidebar />
      <main className="main-content" style={{ flex: 1 }}>
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '1.125rem' }}>
              Dashboard SI Production
            </span>
            <span className="badge badge-gray">Vue Manager</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif" }}>
              Dernière MAJ: Aujourd'hui, 08:30
            </span>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', fontFamily: "'Montserrat', sans-serif" }}>
              S
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/planification" element={<PlanificationPage />} />
          <Route path="/achats" element={<AchatsPage />} />
          <Route path="/reception" element={<ReceptionPage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/livraison" element={<LivraisonPage />} />
          <Route path="/tableau" element={<TableauSIPage />} />
        </Routes>
      </main>
    </div>
  )
}

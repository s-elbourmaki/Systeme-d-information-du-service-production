import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarClock,
  ShoppingCart,
  PackageCheck,
  Cog,
  Truck,
  TableProperties,
} from 'lucide-react'
import { motion } from 'motion/react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard Global' },
  { to: '/planification', icon: CalendarClock, label: 'Planification' },
  { to: '/achats', icon: ShoppingCart, label: 'Achats' },
  { to: '/reception', icon: PackageCheck, label: 'Réception' },
  { to: '/operations', icon: Cog, label: 'Opérations' },
  { to: '/livraison', icon: Truck, label: 'Livraison' },
  { to: '/tableau', icon: TableProperties, label: 'Tableau SI' },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <img src="/logoerp.png" alt="Logo" style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: 10 }} />
          <span style={{
            color: 'var(--black)',
            fontWeight: 700,
            fontSize: '1rem',
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '-0.01em',
            textAlign: 'center',
          }}>
            Salim EL BOURMAKI
          </span>
        </div>
        <span style={{
          display: 'block',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--black)',
          fontFamily: "'Montserrat', sans-serif",
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          SI Production — Odoo 17
        </span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="nav-label">Navigation</div>

        {navItems.map(({ to, icon: Icon, label }, i) => {
          const isActive = to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(to)

          return (
            <motion.div
              key={to}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <NavLink to={to} style={{ textDecoration: 'none' }}>
                <div className={`nav-item${isActive ? ' active' : ''}`}>
                  <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                  <span>{label}</span>
                </div>
              </NavLink>
            </motion.div>
          )
        })}

        <div style={{ flex: 1 }} />
        <div className="nav-label" style={{ marginTop: '1rem' }}>Projet</div>
        <div style={{
          padding: '0.75rem 0.875rem',
          background: 'var(--gray-50)',
          border: '1px solid var(--gray-200)',
          borderRadius: 8,
          fontSize: '0.85rem',
          color: 'var(--black)',
          fontFamily: "'Montserrat', sans-serif",
          lineHeight: 1.6,
        }}>
          <div style={{ color: 'var(--black)', fontWeight: 600, marginBottom: 4 }}>Mini-projet n°:14</div>
          <div>Module : Innover, Entrenprendre et s'Initier à la Gestion d'une Entreprise avec un ERP</div>
          <div style={{ marginTop: 6, color: 'var(--orange)', fontWeight: 600 }}>2025–2026</div>
        </div>
      </nav>
    </div>
  )
}

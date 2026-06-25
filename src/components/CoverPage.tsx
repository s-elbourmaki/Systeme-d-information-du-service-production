import { motion } from 'motion/react'

export function CoverPage() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: 120,
          height: 120,
          border: '1px solid var(--gray-200)',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <img src="/logoerp.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          background: 'var(--blue-20)',
          color: 'var(--blue)',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          padding: '0.3rem 0.875rem',
          borderRadius: 999,
          marginBottom: '1rem',
        }}
      >
        Sujet n° 14
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--black)',
          maxWidth: 700,
          lineHeight: 1.25,
          marginBottom: '0.75rem',
          letterSpacing: '-0.01em',
        }}
      >
        Système d'Information du Service Production
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          fontSize: '0.95rem',
          color: 'var(--gray-600)',
          marginBottom: '2.5rem',
        }}
      >
        Module : Innover, Entreprendre et s'Initier à la Gestion d'une Entreprise avec un ERP
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          display: 'flex',
          gap: '2.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-400)', marginBottom: 4 }}>
            Réalisé par
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--black)' }}>EL BOURMAKI Salim</div>
        </div>
        <div style={{ width: 1, background: 'var(--gray-200)' }} />
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-400)', marginBottom: 4 }}>
            Encadré par
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--black)' }}>Pr. KOUNAIDI Mohamed</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--orange)',
        }}
      >
        Année Universitaire : 2025–2026
      </motion.div>
    </motion.div>
  )
}

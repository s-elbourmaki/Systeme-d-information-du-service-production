import { motion } from 'motion/react'


interface KPICardProps {
  label: string
  value: number
  unit: string
  color?: 'blue' | 'orange'
  trend?: number
  context?: string
  delay?: number
}

export function KPICard({ label, value, unit, color = 'blue', trend, context, delay = 0 }: KPICardProps) {
  const isPositiveTrend = trend !== undefined && ((color === 'orange' && trend < 0) || (color === 'blue' && trend > 0))
  const isNegativeTrend = trend !== undefined && !isPositiveTrend

  return (
    <motion.div
      className="kpi-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    >
      <div style={{ marginBottom: '0.5rem' }}>
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--gray-400)',
          fontFamily: "'Montserrat', sans-serif",
        }}>
          {label}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.375rem', marginBottom: '0.5rem' }}>
        <span className={`kpi-value${color === 'orange' ? ' orange' : ''}`}>
          {value}
        </span>
        <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gray-400)', marginBottom: '0.3rem' }}>
          {unit}
        </span>
        {trend !== undefined && (
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: isPositiveTrend ? 'var(--teal)' : isNegativeTrend ? 'var(--pink)' : 'var(--gray-400)',
            marginBottom: '0.3rem',
            marginLeft: '0.25rem',
          }}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>

      {context && (
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--gray-400)',
          fontFamily: "'Montserrat', sans-serif",
          lineHeight: 1.4,
        }}>
          {context}
        </p>
      )}

      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '2px',
        background: color === 'blue' ? 'var(--blue)' : 'var(--orange)',
        opacity: 0.25,
        borderRadius: '0 0 12px 12px',
      }} />
    </motion.div>
  )
}

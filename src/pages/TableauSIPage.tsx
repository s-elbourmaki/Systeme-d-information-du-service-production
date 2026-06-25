import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { tableauProcessus, processColors, processLabels } from '../data/mockData'
import { TableProperties, ChevronDown, ChevronUp } from 'lucide-react'

export default function TableauSIPage() {
  const [activeProcess, setActiveProcess] = useState<string | null>('All')

  const filteredData = activeProcess === 'All' 
    ? tableauProcessus 
    : tableauProcessus.filter(d => d.processus === activeProcess)

  return (
    <div>
      <div style={{ background: 'var(--blue)', padding: '2rem 2rem 1.75rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <TableProperties size={20} color="var(--orange)" strokeWidth={1.5} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>Livrable Principal</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.625rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>Tableau de synthèse des processus SI</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', fontFamily: "'Montserrat', sans-serif", marginTop: 4 }}>
            Vue complète des flux d'informations, applications et indicateurs de performance
          </p>
        </div>
      </div>

      <div className="page-body">
        {/* Filtres */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveProcess('All')}
            style={{ 
              padding: '0.4rem 1rem', 
              borderRadius: 999, 
              border: '1px solid var(--blue)',
              background: activeProcess === 'All' ? 'var(--blue)' : 'var(--white)',
              color: activeProcess === 'All' ? 'var(--white)' : 'var(--gray-600)',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: "'Montserrat', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Tous les processus
          </button>
          
          {processLabels.map(proc => (
            <button 
              key={proc}
              onClick={() => setActiveProcess(proc)}
              style={{ 
                padding: '0.4rem 1rem', 
                borderRadius: 999, 
                border: `1px solid ${activeProcess === proc ? processColors[proc] : 'var(--gray-200)'}`,
                background: activeProcess === proc ? processColors[proc] : 'var(--white)',
                color: activeProcess === proc ? 'white' : 'var(--gray-600)',
                fontSize: '0.8rem',
                fontWeight: 600,
                fontFamily: "'Montserrat', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {proc}
            </button>
          ))}
        </div>

        {/* Tableau */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="proc-table" style={{ minWidth: 1000 }}>
              <thead>
                <tr>
                  <th style={{ width: '12%' }}>Processus</th>
                  <th style={{ width: '15%' }}>Sous-processus</th>
                  <th style={{ width: '15%' }}>Application SI</th>
                  <th style={{ width: '18%' }}>Données d'entrée</th>
                  <th style={{ width: '18%' }}>Traitements SI</th>
                  <th style={{ width: '12%' }}>Données de sortie</th>
                  <th style={{ width: '10%' }}>KPI</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredData.map((row, i) => (
                    <motion.tr 
                      key={`${row.processus}-${row.sous_processus}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                    >
                      <td style={{ borderLeft: `3px solid ${processColors[row.processus]}` }}>
                        <span style={{ fontWeight: 700, color: processColors[row.processus] }}>
                          {row.processus}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{row.sous_processus}</td>
                      <td>
                        <span className="proc-tag" style={{ background: 'var(--gray-100)', color: 'var(--black)', border: '1px solid var(--gray-200)' }}>
                          {row.application}
                        </span>
                      </td>
                      <td>
                        {row.entrees.split(', ').map(item => (
                          <div key={item} style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 4, height: 4, borderRadius: 2, background: 'var(--orange)' }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </td>
                      <td style={{ color: 'var(--blue)' }}>{row.traitements}</td>
                      <td>
                        {row.sorties.split(', ').map(item => (
                          <div key={item} style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 4, height: 4, borderRadius: 2, background: 'var(--teal)' }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </td>
                      <td>
                        <span className="badge badge-blue" style={{ background: 'var(--blue)', color: 'white' }}>
                          {row.kpi}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

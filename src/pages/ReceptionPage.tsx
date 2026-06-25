import { motion } from 'motion/react'
import { KPICard } from '../components/KPICard'
import { kpisReception } from '../data/mockData'
import { PackageCheck, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

const fluxData = {
  entrees: ['BC, avis expédition', 'BL fournisseur', 'Plan de contrôle'],
  traitements: ['Réception physique', 'Scan code-barres', 'Contrôle Qualité', 'Mise en stock (slotting)'],
  sorties: ['Bon de réception', 'Rapport QC', 'Stocks mis à jour'],
}

const receptions = [
  { lot: 'LOT-2025-0612', article: 'Chêne massif 28mm', qte: 450, statut: 'Accepté',  nc: false, delai: 1.5 },
  { lot: 'LOT-2025-0613', article: 'Hêtre plané 22mm',  qte: 320, statut: 'Accepté',  nc: false, delai: 2.1 },
  { lot: 'LOT-2025-0614', article: 'Vis M6 inox 40mm',  qte: 5000, statut: 'Refusé',  nc: true,  delai: 0.8 },
  { lot: 'LOT-2025-0615', article: 'Noyer 18mm',         qte: 180, statut: 'Accepté',  nc: false, delai: 1.9 },
  { lot: 'LOT-2025-0616', article: 'Colle PVA Pro',      qte: 80,  statut: 'Contrôle', nc: false, delai: 1.2 },
]

export default function ReceptionPage() {
  return (
    <div>
      <div style={{ background: 'var(--teal)', padding: '2rem 2rem 1.75rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <PackageCheck size={20} color="var(--orange)" strokeWidth={1.5} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>Processus 3</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.625rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>Réception</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', fontFamily: "'Montserrat', sans-serif", marginTop: 4 }}>
            Module WMS + QM — Contrôle entrant, traçabilité des lots, mise en stock
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="section-title" style={{ marginTop: '1.5rem' }}>KPIs Réception</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {kpisReception.map((kpi, i) => (
            <KPICard key={kpi.label} label={kpi.label} value={kpi.value} unit={kpi.unit} color={kpi.color as 'blue' | 'orange'} delay={i * 0.08} />
          ))}
        </div>

        {/* Table des réceptions récentes */}
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Réceptions récentes</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="proc-table">
              <thead>
                <tr>
                  <th>N° Lot</th>
                  <th>Article</th>
                  <th>Quantité</th>
                  <th>Statut QC</th>
                  <th>Délai (h)</th>
                </tr>
              </thead>
              <tbody>
                {receptions.map(r => (
                  <tr key={r.lot}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--gray-600)' }}>{r.lot}</td>
                    <td style={{ fontWeight: 600, fontSize: '0.82rem' }}>{r.article}</td>
                    <td style={{ fontSize: '0.82rem' }}>{r.qte.toLocaleString('fr-FR')}</td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {r.nc
                          ? <><XCircle size={13} color="var(--pink)" /><span className="badge badge-orange">{r.statut}</span></>
                          : r.statut === 'Contrôle'
                            ? <span className="badge badge-gray">{r.statut}</span>
                            : <><CheckCircle2 size={13} color="var(--teal)" /><span className="badge badge-green">{r.statut}</span></>
                        }
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{r.delai} h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Flux */}
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Flux d'information — Processus Réception</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '0.75rem', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--orange)', marginBottom: '0.5rem', fontFamily: "'Montserrat', sans-serif" }}>Entrées</div>
              {fluxData.entrees.map(e => <div key={e} className="flow-box input" style={{ marginBottom: 6 }}>{e}</div>)}
            </div>
            <ArrowRight size={20} color="var(--blue)" style={{ marginTop: '2.5rem' }} />
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)', marginBottom: '0.5rem', fontFamily: "'Montserrat', sans-serif" }}>Traitements SI</div>
              {fluxData.traitements.map(t => <div key={t} className="flow-box process" style={{ marginBottom: 6 }}>{t}</div>)}
            </div>
            <ArrowRight size={20} color="var(--blue)" style={{ marginTop: '2.5rem' }} />
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--teal)', marginBottom: '0.5rem', fontFamily: "'Montserrat', sans-serif" }}>Sorties</div>
              {fluxData.sorties.map(s => <div key={s} className="flow-box output" style={{ marginBottom: 6 }}>{s}</div>)}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

import { motion } from 'motion/react'
import { KPICard } from '../components/KPICard'
import { kpisAchats } from '../data/mockData'
import ReactECharts from 'echarts-for-react'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import { COLORS, tooltipStyle, axisLineStyle } from '../lib/chartTheme'

const fluxData = {
  entrees: ['OA suggérés (MRP)', 'Fichier fournisseurs', 'Seuils réappro'],
  traitements: ['Création DA', 'Sélection fournisseur', 'Passation BC', 'Suivi commandes'],
  sorties: ['BC signé', 'Tableau de suivi', 'Alertes retards'],
}

const performanceData = [
  { fournisseur: 'Bois du Nord SAS', otd: 96, conformite: 98, delai: 3.5 },
  { fournisseur: 'Chêne & Cie',      otd: 91, conformite: 97, delai: 4.8 },
  { fournisseur: 'Hêtre Massif SA',  otd: 88, conformite: 99, delai: 5.2 },
  { fournisseur: 'Pin des Vosges',   otd: 93, conformite: 96, delai: 3.9 },
]

export default function AchatsPage() {
  const radarOpts = {
    backgroundColor: 'transparent',
    tooltip: { ...tooltipStyle(COLORS.orange) },
    radar: {
      shape: 'circle',
      indicator: [
        { name: 'OTD', max: 100 }, { name: 'Conformité', max: 100 },
        { name: 'Délai (inv.)', max: 100 }, { name: 'Économies', max: 100 },
      ],
      axisName: { color: '#6B7280', fontFamily: "'Montserrat', sans-serif", fontSize: 11 },
      splitLine: axisLineStyle,
    },
    series: [{
      type: 'radar',
      data: [{ value: [91.5, 97.9, 76, 83], name: 'Salim EL BOURMAKI', areaStyle: { color: 'rgba(99,102,241,0.15)' }, lineStyle: { color: COLORS.blue, width: 2 }, itemStyle: { color: COLORS.blue } }],
    }],
  }

  return (
    <div>
      <div style={{ background: 'var(--orange)', padding: '2rem 2rem 1.75rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <ShoppingCart size={20} color="#fff" strokeWidth={1.5} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>Processus 2</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.625rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>Achats</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', fontFamily: "'Montserrat', sans-serif", marginTop: 4 }}>
            Module Achats (ERP) — DA → Sélection fournisseur → BC → Suivi
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="section-title" style={{ marginTop: '1.5rem' }}>KPIs Achats</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {kpisAchats.map((kpi, i) => (
            <KPICard key={kpi.label} label={kpi.label} value={kpi.value} unit={kpi.unit} color={kpi.color as 'blue' | 'orange'} delay={i * 0.08} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
          {/* Radar */}
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: 4 }}>Performance Achats — Radar</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Synthèse multi-dimensionnelle des indicateurs achats</p>
            <ReactECharts option={radarOpts} style={{ height: 280 }} />
          </motion.div>

          {/* Fournisseurs table */}
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Performance par fournisseur</h3>
            <table className="proc-table">
              <thead>
                <tr>
                  <th>Fournisseur</th>
                  <th>OTD</th>
                  <th>Conform.</th>
                  <th>Délai</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map(f => (
                  <tr key={f.fournisseur}>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>{f.fournisseur}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="progress-bar" style={{ width: 60 }}>
                          <div className="progress-fill" style={{ width: `${f.otd}%` }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{f.otd}%</span>
                      </div>
                    </td>
                    <td><span className={`badge ${f.conformite >= 98 ? 'badge-blue' : 'badge-orange'}`}>{f.conformite}%</span></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>{f.delai} j</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        {/* Flux */}
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Flux d'information — Processus Achats</h3>
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

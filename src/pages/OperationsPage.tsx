import { motion } from 'motion/react'
import { KPICard } from '../components/KPICard'
import { kpisOperations, trsMachines, productionMensuelle } from '../data/mockData'
import ReactECharts from 'echarts-for-react'
import { Cog, ArrowRight, AlertTriangle } from 'lucide-react'
import { COLORS, tooltipStyle, axisLabelStyle, axisLineStyle, splitLineStyle } from '../lib/chartTheme'

const fluxData = {
  entrees: ['OF confirmés', 'Matières disponibles', 'Données IoT machines'],
  traitements: ['Lancement OF', 'Suivi MES temps réel', 'Contrôle Qualité SPC', 'Clôture OF'],
  sorties: ['Dashboard TRS', 'Stock PF mis à jour', 'Rapports Non-Conformités'],
}

const ofEnCours = [
  { ref: 'OF-2025-0247', produit: 'Table chêne 6 pers.',   avancement: 72, atelier: 'Atelier B', debut: '23/06', fin: '27/06' },
  { ref: 'OF-2025-0248', produit: 'Bibliothèque hêtre',     avancement: 45, atelier: 'Atelier A', debut: '24/06', fin: '28/06' },
  { ref: 'OF-2025-0249', produit: 'Chaises classiques ×12', avancement: 89, atelier: 'Atelier C', debut: '21/06', fin: '25/06' },
  { ref: 'OF-2025-0250', produit: 'Bureau noyer',            avancement: 18, atelier: 'Atelier A', debut: '25/06', fin: '30/06' },
]

export default function OperationsPage() {
  const trsOpts = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', ...tooltipStyle(COLORS.blue, 'shadow') },
    grid: { left: 130, right: 60, bottom: 16, top: 16, containLabel: false },
    xAxis: { type: 'value', max: 100, axisLabel: { ...axisLabelStyle, formatter: '{value}%' }, splitLine: splitLineStyle },
    yAxis: { type: 'category', data: trsMachines.map(d => d.machine), axisLabel: { ...axisLabelStyle, color: '#374151' }, axisLine: { show: false }, axisTick: { show: false } },
    series: [{
      type: 'bar',
      data: trsMachines.map(d => ({ value: d.trs, itemStyle: { color: d.trs >= 85 ? COLORS.teal : d.trs >= 75 ? COLORS.orange : COLORS.red, borderRadius: [0, 4, 4, 0] } })),
      label: { show: true, position: 'right', formatter: '{c}%', color: '#374151', fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600 },
      barMaxWidth: 22,
      markLine: { data: [{ xAxis: 85 }], lineStyle: { color: COLORS.blue, type: 'dashed', width: 1.5 }, label: { formatter: 'Cible 85%', color: COLORS.blue, fontSize: 10, fontFamily: "'Montserrat', sans-serif" } },
    }],
  }

  const tendanceOpts = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', ...tooltipStyle(COLORS.blue) },
    grid: { left: 36, right: 20, bottom: 24, top: 16, containLabel: true },
    xAxis: { type: 'category', data: productionMensuelle.map(d => d.mois), axisLabel: axisLabelStyle, axisLine: axisLineStyle },
    yAxis: [
      { type: 'value', name: 'Unités', axisLabel: axisLabelStyle, splitLine: splitLineStyle },
      { type: 'value', name: 'Rebuts', axisLabel: { ...axisLabelStyle, color: COLORS.orange }, splitLine: { show: false } },
    ],
    series: [
      { name: 'Réalisé', type: 'bar', data: productionMensuelle.map(d => d.realise), itemStyle: { color: COLORS.blue, borderRadius: [4, 4, 0, 0], opacity: 0.85 }, barMaxWidth: 32 },
      { name: 'Rebuts', type: 'line', yAxisIndex: 1, smooth: true, data: productionMensuelle.map(d => d.rebuts), lineStyle: { color: COLORS.orange, width: 2.5 }, itemStyle: { color: COLORS.orange }, symbol: 'circle', symbolSize: 7 },
    ],
  }

  return (
    <div>
      <div style={{ background: 'var(--pink)', padding: '2rem 2rem 1.75rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Cog size={20} color="var(--orange)" strokeWidth={1.5} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>Processus 4</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.625rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>Gestion des Opérations</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', fontFamily: "'Montserrat', sans-serif", marginTop: 4 }}>
            MES + Module Production (ERP) — Lancement OF, suivi temps réel, contrôle qualité, clôture
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="section-title" style={{ marginTop: '1.5rem' }}>KPIs Opérations</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {kpisOperations.map((kpi, i) => (
            <KPICard key={kpi.label} label={kpi.label} value={kpi.value} unit={kpi.unit} color={kpi.color as 'blue' | 'orange'} delay={i * 0.07} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
          {/* TRS */}
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: 4 }}>TRS par machine</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Moyenne mensuelle — Seuil cible 85%</p>
            <ReactECharts option={trsOpts} style={{ height: 220 }} />
          </motion.div>

          {/* Tendance rebuts */}
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: 4 }}>Production & évolution des rebuts</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Tendance en amélioration continue sur 6 mois</p>
            <ReactECharts option={tendanceOpts} style={{ height: 220 }} />
          </motion.div>
        </div>

        {/* OF en cours */}
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Ordres de Fabrication en cours</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {ofEnCours.map(of => (
              <div key={of.ref} style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: '0.875rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--gray-400)', marginRight: 8 }}>{of.ref}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: "'Montserrat', sans-serif" }}>{of.produit}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className="badge badge-gray">{of.atelier}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif" }}>{of.debut} → {of.fin}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="progress-bar" style={{ flex: 1 }}>
                    <div className={`progress-fill${of.avancement < 50 ? ' orange' : ''}`} style={{ width: `${of.avancement}%` }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: of.avancement >= 80 ? 'var(--teal)' : of.avancement >= 50 ? 'var(--blue)' : 'var(--orange)', minWidth: 36, textAlign: 'right', fontFamily: "'Montserrat', sans-serif" }}>{of.avancement}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alert */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <div className="alert-strip" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <AlertTriangle size={16} color="var(--orange)" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <strong style={{ fontFamily: "'Montserrat', sans-serif" }}>Point d'attention — Cabine Vernis #4 (TRS 68%) :</strong>
              {' '}Temps de séchage incompressibles, arrêts pour changement de couleur, sensibilité aux poussières.
              Action corrective lancée : filtration d'air + automatisation du nettoyage inter-lots.
            </div>
          </div>
        </motion.div>

        {/* Flux */}
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ marginTop: '1.25rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Flux d'information — Processus Opérations</h3>
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

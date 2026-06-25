import { motion } from 'motion/react'
import { KPICard } from '../components/KPICard'
import { kpisPlanification, chargeCapacite } from '../data/mockData'
import ReactECharts from 'echarts-for-react'
import { CalendarClock, ArrowRight } from 'lucide-react'
import { COLORS, tooltipStyle, axisLabelStyle, axisLineStyle, splitLineStyle, legendTextStyle } from '../lib/chartTheme'

const fluxData = {
  entrees: ['Prévisions de ventes', 'Commandes fermes', 'Stocks actuels', 'Nomenclatures (BOM)'],
  traitements: ['Élaboration PDP', 'Calcul MRP', 'Ordonnancement APS'],
  sorties: ['OF suggérés', 'OA suggérés', 'Planning Gantt'],
}

export default function PlanificationPage() {
  const chargeOpts = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', ...tooltipStyle(COLORS.blue) },
    legend: { data: ['Charge (%)', 'Capacité (%)'], top: 0, textStyle: legendTextStyle },
    grid: { left: 36, right: 20, bottom: 24, top: 36, containLabel: true },
    xAxis: { type: 'category', data: chargeCapacite.map(d => d.semaine), axisLabel: axisLabelStyle, axisLine: axisLineStyle },
    yAxis: { type: 'value', max: 110, axisLabel: { ...axisLabelStyle, formatter: '{value}%' }, splitLine: splitLineStyle },
    series: [
      { name: 'Charge (%)',    type: 'line', smooth: true, data: chargeCapacite.map(d => d.charge),   lineStyle: { color: COLORS.blue, width: 2.5 }, itemStyle: { color: COLORS.blue }, areaStyle: { color: 'rgba(99,102,241,0.1)' }, symbol: 'circle', symbolSize: 6 },
      { name: 'Capacité (%)', type: 'line', smooth: false, data: chargeCapacite.map(d => d.capacite), lineStyle: { color: COLORS.orange, width: 1.5, type: 'dashed' }, itemStyle: { color: COLORS.orange }, symbol: 'none' },
    ],
  }

  return (
    <div>
      <div style={{ background: 'var(--blue)', padding: '2rem 2rem 1.75rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <CalendarClock size={20} color="var(--orange)" strokeWidth={1.5} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>Processus 1</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.625rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>Planification</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', fontFamily: "'Montserrat', sans-serif", marginTop: 4 }}>
            MPS · MRP · Ordonnancement APS — Transformation de la demande commerciale en plan de production
          </p>
        </div>
      </div>

      <div className="page-body">
        {/* KPIs */}
        <div className="section-title" style={{ marginTop: '1.5rem' }}>KPIs Planification</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {kpisPlanification.map((kpi, i) => (
            <KPICard key={kpi.label} label={kpi.label} value={kpi.value} unit={kpi.unit} color={kpi.color as 'blue' | 'orange'} delay={i * 0.08} />
          ))}
        </div>

        {/* Charge vs Capacité */}
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: 4 }}>Charge vs Capacité — Horizon 6 semaines</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Taux d'utilisation des postes de travail par rapport à la capacité nominale</p>
          <ReactECharts option={chargeOpts} style={{ height: 260 }} />
        </motion.div>

        {/* Flux d'information */}
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Flux d'information — Processus Planification</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '0.75rem', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--orange)', marginBottom: '0.5rem', fontFamily: "'Montserrat', sans-serif" }}>Entrées</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {fluxData.entrees.map(e => <div key={e} className="flow-box input">{e}</div>)}
              </div>
            </div>
            <ArrowRight size={20} color="var(--blue)" style={{ marginTop: '2.5rem' }} />
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)', marginBottom: '0.5rem', fontFamily: "'Montserrat', sans-serif" }}>Traitements SI</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {fluxData.traitements.map(t => <div key={t} className="flow-box process">{t}</div>)}
              </div>
            </div>
            <ArrowRight size={20} color="var(--blue)" style={{ marginTop: '2.5rem' }} />
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--teal)', marginBottom: '0.5rem', fontFamily: "'Montserrat', sans-serif" }}>Sorties</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {fluxData.sorties.map(s => <div key={s} className="flow-box output">{s}</div>)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

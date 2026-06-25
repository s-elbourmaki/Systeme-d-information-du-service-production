import { motion } from 'motion/react'
import { globalKPIs, productionMensuelle, trsMachines, statutOF } from '../data/mockData'
import { KPICard } from '../components/KPICard'
import ReactECharts from 'echarts-for-react'
import { COLORS, tooltipStyle, axisLabelStyle, axisLineStyle, splitLineStyle, legendTextStyle } from '../lib/chartTheme'

export default function DashboardPage() {
  // Production chart options
  const productionOpts = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', ...tooltipStyle(COLORS.blue) },
    legend: { data: ['Planifié', 'Réalisé', 'Rebuts'], top: 0, textStyle: legendTextStyle },
    grid: { left: 40, right: 20, bottom: 24, top: 36, containLabel: true },
    xAxis: { type: 'category', data: productionMensuelle.map(d => d.mois), axisLine: axisLineStyle, axisLabel: axisLabelStyle },
    yAxis: { type: 'value', axisLabel: axisLabelStyle, splitLine: splitLineStyle },
    series: [
      { name: 'Planifié', type: 'bar', data: productionMensuelle.map(d => d.planifie), itemStyle: { color: COLORS.blue, borderRadius: [4, 4, 0, 0], opacity: 0.85 }, barMaxWidth: 28 },
      { name: 'Réalisé',  type: 'bar', data: productionMensuelle.map(d => d.realise),  itemStyle: { color: COLORS.teal, borderRadius: [4, 4, 0, 0] }, barMaxWidth: 28 },
      { name: 'Rebuts',   type: 'bar', data: productionMensuelle.map(d => d.rebuts),   itemStyle: { color: COLORS.orange, borderRadius: [4, 4, 0, 0] }, barMaxWidth: 28 },
    ],
  }

  // TRS machines gauge-style bars
  const trsOpts = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', ...tooltipStyle(COLORS.blue, 'shadow') },
    grid: { left: 130, right: 60, bottom: 16, top: 16, containLabel: false },
    xAxis: { type: 'value', max: 100, axisLabel: { ...axisLabelStyle, formatter: '{value}%' }, splitLine: splitLineStyle },
    yAxis: { type: 'category', data: trsMachines.map(d => d.machine), axisLabel: { ...axisLabelStyle, color: '#374151' }, axisLine: { show: false }, axisTick: { show: false } },
    series: [
      {
        type: 'bar',
        data: trsMachines.map(d => ({
          value: d.trs,
          itemStyle: { color: d.trs >= 85 ? COLORS.teal : d.trs >= 75 ? COLORS.orange : COLORS.red, borderRadius: [0, 4, 4, 0] },
        })),
        label: { show: true, position: 'right', formatter: '{c}%', color: '#374151', fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600 },
        barMaxWidth: 22,
        markLine: { data: [{ xAxis: 85 }], lineStyle: { color: COLORS.blue, type: 'dashed', width: 1.5 }, label: { formatter: 'Seuil 85%', color: COLORS.blue, fontFamily: "'Montserrat', sans-serif", fontSize: 10 } },
      },
    ],
  }

  // Donut OF
  const donutOpts = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', formatter: '{b}: {d}%', ...tooltipStyle(COLORS.orange) },
    legend: { bottom: 0, textStyle: legendTextStyle },
    series: [{
      type: 'pie',
      radius: ['50%', '78%'],
      center: ['50%', '44%'],
      avoidLabelOverlap: false,
      label: { show: false },
      labelLine: { show: false },
      itemStyle: { borderColor: '#fff', borderWidth: 3 },
      data: statutOF.map(d => ({ name: d.name, value: d.value, itemStyle: { color: d.color } })),
    }],
  }

  return (
    <div>
      {/* ── Hero Header ─────────────────────────────────── */}
      <div className="animated-bg scanlines" style={{ position: 'relative', padding: '2.5rem 2rem 2rem', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ background: 'var(--orange)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.2rem 0.625rem', borderRadius: 4, fontFamily: "'Montserrat', sans-serif" }}>
                SI Production
              </span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: "'Montserrat', sans-serif" }}>
                Mini-projet n°:14, Module : Innover, Entrenprendre et s'Initier à la Gestion d'une Entreprise avec un ERP
              </span>
            </div>
            <h1 style={{ color: '#fff', fontSize: '1.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
              Système d'Information du Service Production
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', fontFamily: "'Montserrat', sans-serif", maxWidth: 640 }}>
              Salim EL BOURMAKI · Odoo 17 · Planification, Achats, Réception, Opérations, Livraison
            </p>
          </motion.div>
        </div>

        {/* Decorative grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px', zIndex: 1 }} />
      </div>

      <div className="page-body">
        {/* ── Charts Row ─────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem', marginBottom: '1.25rem', marginTop: '1.5rem' }}>
          {/* Production mensuelle */}
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: 2 }}>Production mensuelle</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif" }}>Planifié · Réalisé · Rebuts (unités)</p>
            </div>
            <ReactECharts option={productionOpts} style={{ height: 240 }} />
          </motion.div>

          {/* Statut OF */}
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: 2 }}>Statut des OF</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif" }}>Ordres de fabrication en cours</p>
            </div>
            <ReactECharts option={donutOpts} style={{ height: 240 }} />
          </motion.div>
        </div>

        {/* TRS par machine */}
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginBottom: '1.25rem' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: 2 }}>TRS par machine</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif" }}>Taux de Rendement Synthétique — seuil cible 85%</p>
            </div>
            <span className="badge badge-orange">Point d'attention : Cabine Vernis #4 (68%)</span>
          </div>
          <ReactECharts option={trsOpts} style={{ height: 200 }} />
        </motion.div>

        {/* Alert strip */}
        <motion.div className="alert-strip" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ marginBottom: '1.5rem' }}>
          <strong style={{ fontFamily: "'Montserrat', sans-serif" }}>Action corrective en cours :</strong>
          {' '}Installation d'un système de filtration d'air et automatisation du nettoyage entre lots sur la Cabine Vernis #4.
        </motion.div>

        {/* ── KPI Strip ──────────────────────────────────── */}
        <div className="section-title">Indicateurs clés de performance</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {globalKPIs.map((kpi, i) => (
            <KPICard key={kpi.id} label={kpi.label} value={kpi.value} unit={kpi.unit} color={kpi.color as 'blue' | 'orange'} trend={kpi.trend} context={kpi.context} delay={0.5 + (i * 0.08)} />
          ))}
        </div>
      </div>
    </div>
  )
}

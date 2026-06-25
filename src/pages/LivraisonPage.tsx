import { motion } from 'motion/react'
import { KPICard } from '../components/KPICard'
import { kpisLivraison } from '../data/mockData'
import ReactECharts from 'echarts-for-react'
import { Truck, ArrowRight, MapPin } from 'lucide-react'
import { COLORS, tooltipStyle, axisLabelStyle, axisLineStyle, splitLineStyle } from '../lib/chartTheme'

const fluxData = {
  entrees: ['Commande client', 'Stock PF', 'Planning transporteurs'],
  traitements: ['Picking optimisé', 'Emballage & étiquetage', 'Génération BL', 'Suivi GPS TMS'],
  sorties: ['BL + Facture', 'POD signée', 'Statut Livré client'],
}

const expeditions = [
  { bl: 'BL-2025-0182', client: 'Maisons du Monde', destination: 'Lyon',    colis: 8, statut: 'Livré',      otd: true  },
  { bl: 'BL-2025-0183', client: 'Leroy Merlin Deco', destination: 'Bordeaux', colis: 12, statut: 'En transit', otd: true  },
  { bl: 'BL-2025-0184', client: 'Habitat & Co',      destination: 'Nantes',  colis: 5, statut: 'En transit', otd: true  },
  { bl: 'BL-2025-0185', client: 'La Redoute',         destination: 'Lille',   colis: 20, statut: 'Retard',    otd: false },
  { bl: 'BL-2025-0186', client: 'But SA',              destination: 'Paris',   colis: 15, statut: 'Préparé',   otd: true  },
]

const otdMensuel = [
  { mois: 'Janv.', otd: 93.2 }, { mois: 'Févr.', otd: 94.1 }, { mois: 'Mars', otd: 95.0 },
  { mois: 'Avr.', otd: 94.8 }, { mois: 'Mai', otd: 96.2 },    { mois: 'Juin', otd: 95.7 },
]

export default function LivraisonPage() {
  const otdOpts = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', ...tooltipStyle(COLORS.purple) },
    grid: { left: 36, right: 20, bottom: 24, top: 16, containLabel: true },
    xAxis: { type: 'category', data: otdMensuel.map(d => d.mois), axisLabel: axisLabelStyle, axisLine: axisLineStyle },
    yAxis: { type: 'value', min: 90, max: 100, axisLabel: { ...axisLabelStyle, formatter: '{value}%' }, splitLine: splitLineStyle },
    series: [{
      name: 'OTD', type: 'line', smooth: true, data: otdMensuel.map(d => d.otd),
      lineStyle: { color: COLORS.purple, width: 2.5 },
      itemStyle: { color: COLORS.purple },
      areaStyle: { color: 'rgba(139,92,246,0.12)' },
      symbol: 'circle', symbolSize: 8,
      markLine: { data: [{ yAxis: 95 }], lineStyle: { color: COLORS.orange, type: 'dashed', width: 1.5 }, label: { formatter: 'Cible 95%', color: COLORS.orange, fontSize: 10, fontFamily: "'Montserrat', sans-serif" } },
    }],
  }

  return (
    <div>
      <div style={{ background: 'var(--purple)', padding: '2rem 2rem 1.75rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Truck size={20} color="var(--orange)" strokeWidth={1.5} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>Processus 5</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.625rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>Livraison</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', fontFamily: "'Montserrat', sans-serif", marginTop: 4 }}>
            TMS + Module Ventes (ERP) — Picking, emballage, expédition, traçabilité POD
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="section-title" style={{ marginTop: '1.5rem' }}>KPIs Livraison</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {kpisLivraison.map((kpi, i) => (
            <KPICard key={kpi.label} label={kpi.label} value={kpi.value} unit={kpi.unit} color={kpi.color as 'blue' | 'orange'} delay={i * 0.08} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
          {/* OTD */}
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: 4 }}>Évolution OTD Client</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Tendance haussière — Cible : 95%</p>
            <ReactECharts option={otdOpts} style={{ height: 240 }} />
          </motion.div>

          {/* Expéditions */}
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Expéditions récentes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {expeditions.map(exp => (
                <div key={exp.bl} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--gray-50)', borderRadius: 8, border: '1px solid var(--gray-200)' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}>{exp.client}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <MapPin size={11} color="var(--gray-400)" />
                      <span style={{ fontSize: '0.7rem', color: 'var(--gray-400)', fontFamily: "'Montserrat', sans-serif" }}>{exp.destination} · {exp.colis} colis</span>
                    </div>
                  </div>
                  <span className={`badge ${exp.statut === 'Livré' ? 'badge-green' : exp.statut === 'Retard' ? 'badge-orange' : 'badge-gray'}`}>
                    {exp.statut}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Flux */}
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '1rem' }}>Flux d'information — Processus Livraison</h3>
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

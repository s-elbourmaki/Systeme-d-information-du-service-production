// Shared ECharts theme matching the design system in index.css
export const COLORS = {
  blue: '#6366F1',   // Indigo
  orange: '#F59E0B', // Amber
  teal: '#14B8A6',
  pink: '#EC4899',
  purple: '#8B5CF6',
  green: '#10B981',
  red: '#EF4444',
  gray: '#9CA3AF',
}

const FONT = "'Montserrat', sans-serif"

export const tooltipStyle = (accent: string = COLORS.blue, axisPointerType?: 'line' | 'shadow') => ({
  backgroundColor: '#fff',
  borderColor: '#E5E7EB',
  borderWidth: 1,
  borderRadius: 10,
  padding: [8, 12],
  extraCssText: 'box-shadow: 0 8px 24px rgba(17,24,39,0.12);',
  textStyle: { color: '#1F2937', fontFamily: FONT, fontSize: 12 },
  axisPointer: axisPointerType ? { type: axisPointerType, lineStyle: { color: accent } } : { lineStyle: { color: accent } },
})

export const axisLabelStyle = { color: '#6B7280', fontFamily: FONT, fontSize: 11 }
export const axisLineStyle = { lineStyle: { color: '#E5E7EB' } }
export const splitLineStyle = { lineStyle: { color: '#F3F4F6' } }
export const legendTextStyle = { color: '#6B7280', fontFamily: FONT, fontSize: 12 }

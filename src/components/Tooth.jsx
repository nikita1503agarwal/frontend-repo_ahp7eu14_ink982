import { useState } from 'react'

const statusColors = {
  healthy: 'bg-emerald-500',
  cavity: 'bg-amber-500',
  root_canal: 'bg-red-500',
  missing: 'bg-gray-300',
  implant: 'bg-blue-500',
  crown: 'bg-purple-500',
}

export default function Tooth({ id, label, status = 'healthy', x, y, rotate = 0, onHover }) {
  const [hovered, setHovered] = useState(false)
  const color = statusColors[status] || 'bg-slate-400'

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotate})`}
      onMouseEnter={() => { setHovered(true); onHover?.({ id, label, status, x, y }) }}
      onMouseMove={(e) => onHover?.({ id, label, status, x: e.clientX, y: e.clientY })}
      onMouseLeave={() => { setHovered(false); onHover?.(null) }}
      className="cursor-pointer"
    >
      {/* simplified tooth shape as rounded rect */}
      <rect x={-12} y={-18} rx={6} ry={6} width={24} height={30} className={`${color} stroke-slate-700`} strokeWidth={1.5} />
      {/* root indication */}
      <rect x={-6} y={12} rx={4} ry={4} width={12} height={10} className={`${color} opacity-80`} />
      <title>{`${label} • ${status.replace('_', ' ')}`}</title>
    </g>
  )
}

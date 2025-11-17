import { useMemo, useState } from 'react'
import Tooth from './Tooth'

/*
 Adult human has 32 teeth: 16 upper (1-16), 16 lower (17-32).
 We'll lay them out in a semi-elliptical arch for both jaws.
*/

const defaultStatuses = [
  // 1-16 upper right to upper left
  'healthy','healthy','cavity','healthy','crown','healthy','healthy','missing','healthy','healthy','implant','healthy','healthy','cavity','healthy','healthy',
  // 17-32 lower left to lower right
  'healthy','healthy','healthy','cavity','healthy','healthy','crown','healthy','healthy','missing','healthy','healthy','implant','healthy','healthy','healthy',
]

function generateTeeth(statuses = []) {
  const teeth = []
  const upperRadiusX = 280
  const upperRadiusY = 140
  const lowerRadiusX = 260
  const lowerRadiusY = 120

  // Upper arch: indices 0..15 map to teeth 1..16
  for (let i = 0; i < 16; i++) {
    const t = i / 15 // 0..1
    const angle = Math.PI * (1 + t) // PI..2PI (semi-ellipse)
    const x = Math.cos(angle) * upperRadiusX
    const y = Math.sin(angle) * upperRadiusY - 120
    const rotate = (t - 0.5) * 60 // fan rotation for nicer orientation
    teeth.push({
      id: i + 1,
      label: `Górna ${i + 1}`,
      arch: 'upper',
      x,
      y,
      rotate,
      status: statuses[i] || 'healthy',
    })
  }

  // Lower arch: indices 16..31 map to teeth 17..32
  for (let j = 0; j < 16; j++) {
    const t = j / 15
    const angle = Math.PI * (2 + t) // 2PI..3PI
    const x = Math.cos(angle) * lowerRadiusX
    const y = Math.sin(angle) * lowerRadiusY + 120
    const rotate = (t - 0.5) * -60
    teeth.push({
      id: j + 17,
      label: `Dolna ${j + 17}`,
      arch: 'lower',
      x,
      y,
      rotate,
      status: statuses[j + 16] || 'healthy',
    })
  }

  return teeth
}

export default function Jaw({ statuses = defaultStatuses, onToothHover }) {
  const [hover, setHover] = useState(null)
  const teeth = useMemo(() => generateTeeth(statuses), [statuses])

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative">
        {/* Tooltip */}
        {hover && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-8 bg-white/95 backdrop-blur border border-slate-200 shadow-lg rounded px-3 py-1 text-sm text-slate-800"
            style={{ left: hover.x, top: hover.y }}
          >
            <div className="font-medium">{hover.label}</div>
            <div className="capitalize text-slate-600">{hover.status.replace('_',' ')}</div>
          </div>
        )}

        <svg viewBox="-400 -260 800 520" className="w-[min(100%,900px)] h-auto">
          {/* Gum background */}
          <ellipse cx="0" cy="-120" rx="320" ry="160" className="fill-rose-200/40" />
          <ellipse cx="0" cy="120" rx="300" ry="150" className="fill-rose-200/40" />

          {/* Teeth */}
          {teeth.map(t => (
            <Tooth key={t.id} {...t} onHover={setHover} />
          ))}
        </svg>
      </div>
    </div>
  )
}

import { useState } from 'react'
import Jaw from './components/Jaw'

export default function App() {
  const [statuses, setStatuses] = useState(Array(32).fill('healthy'))

  // example demo: mark a few teeth to show colors
  const demoStatuses = [...statuses]
  demoStatuses[2] = 'cavity' // tooth 3
  demoStatuses[4] = 'crown'  // tooth 5
  demoStatuses[7] = 'missing' // tooth 8
  demoStatuses[10] = 'implant' // tooth 11
  demoStatuses[18] = 'root_canal' // tooth 19

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Schemat szczęki – 32 zęby</h1>
        <p className="text-slate-600 mb-8">Najedź kursorem na ząb, aby zobaczyć jego stan. Kolory reprezentują: zdrowy, ubytek, kanałowe, brak, implant, korona.</p>

        <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-4 md:p-6">
          <Jaw statuses={demoStatuses} />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-sm">
            <Legend color="bg-emerald-500" label="Zdrowy" />
            <Legend color="bg-amber-500" label="Ubytek" />
            <Legend color="bg-red-500" label="Kanałowe" />
            <Legend color="bg-gray-300" label="Brak" />
            <Legend color="bg-blue-500" label="Implant" />
            <Legend color="bg-purple-500" label="Korona" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block w-3 h-3 rounded ${color}`} />
      <span className="text-slate-700">{label}</span>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { getTheme } from '../../theme'

const AllTask = ({ themeMode = 'light' }) => {
  const t = getTheme(themeMode)
  const [summary, setSummary] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/tasks', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        const map = new Map()
        data.forEach((task) => {
          if (!task.assignedTo) return
          const key = task.assignedTo.id
          if (!map.has(key)) {
            map.set(key, {
              id: key,
              name: task.assignedTo.name,
              newTask: 0,
              active: 0,
              completed: 0,
              failed: 0,
            })
          }
          const entry = map.get(key)
          if (task.status === 'new') entry.newTask += 1
          if (task.status === 'active') entry.active += 1
          if (task.status === 'completed') entry.completed += 1
          if (task.status === 'failed') entry.failed += 1
        })
        const result = Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
        setSummary(result)
      } finally {
        setLoading(false)
      }
    }
    loadTasks()
  }, [])

  return (
    <div className={`rounded-2xl border ${t.border} ${t.card} p-6 shadow-sm panel-reveal`}>
      <div className={`flex items-center justify-between rounded-xl ${themeMode === 'dark' ? 'bg-white text-black' : 'bg-slate-900 text-white'} px-4 py-3 text-xs font-semibold uppercase tracking-widest`}>
        <span className="w-1/5">Employee</span>
        <span className="w-1/5 text-center">New</span>
        <span className="w-1/5 text-center">Active</span>
        <span className="w-1/5 text-center">Completed</span>
        <span className="w-1/5 text-center">Failed</span>
      </div>
      <div className="mt-3 space-y-2">
        {loading ? (
          <div className={`text-sm ${t.textMuted}`}>Loading task summary...</div>
        ) : summary.length ? (
          summary.map((elem) => (
            <div
              key={elem.id}
              className={`flex items-center justify-between rounded-xl border ${t.border} ${t.cardSoft} px-4 py-3 text-sm ${t.textMuted}`}
            >
              <span className={`w-1/5 font-medium ${t.text}`}>{elem.name}</span>
              <span className="w-1/5 text-center">{elem.newTask}</span>
              <span className="w-1/5 text-center">{elem.active}</span>
              <span className="w-1/5 text-center">{elem.completed}</span>
              <span className="w-1/5 text-center">{elem.failed}</span>
            </div>
          ))
        ) : (
          <div className={`text-sm ${t.textMuted}`}>No tasks found.</div>
        )}
      </div>
    </div>
  )
}

export default AllTask

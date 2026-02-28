import React, { useEffect, useState } from 'react'
import { getTheme } from '../../theme'

const AdminAttendance = ({ themeMode = 'light' }) => {
  const t = getTheme(themeMode)
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/attendance', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        setEntries(data)
      } finally {
        setLoading(false)
      }
    }
    loadEntries()
  }, [])

  return (
    <div className={`rounded-2xl border ${t.border} ${t.card} p-6 shadow-sm panel-reveal`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-lg font-semibold ${t.text}`}>Attendance Overview</h3>
          <p className={`text-sm ${t.textMuted}`}>Review team attendance records.</p>
        </div>
        <div className={`text-xs uppercase tracking-[0.2em] ${t.textSubtle}`}>{entries.length} Records</div>
      </div>

      <div className="mt-6 space-y-2">
        <div className={`flex items-center justify-between rounded-xl ${themeMode === 'dark' ? 'bg-white text-black' : 'bg-slate-900 text-white'} px-4 py-3 text-xs font-semibold uppercase tracking-widest`}>
          <span className="w-2/5">Employee</span>
          <span className="w-1/5 text-center">Date</span>
          <span className="w-1/5 text-center">Status</span>
          <span className="w-1/5 text-right">Email</span>
        </div>

        {loading ? (
          <div className={`text-sm ${t.textMuted}`}>Loading attendance...</div>
        ) : entries.length ? (
          entries.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between rounded-xl border ${t.border} ${t.cardSoft} px-4 py-3 text-sm`}
            >
              <span className={`w-2/5 font-medium ${t.text}`}>{item.user?.name || 'Unknown'}</span>
              <span className="w-1/5 text-center">{item.date}</span>
              <span className="w-1/5 text-center uppercase text-xs tracking-widest text-slate-500">{item.status}</span>
              <span className="w-1/5 text-right text-xs text-slate-500">{item.user?.email || '-'}</span>
            </div>
          ))
        ) : (
          <div className={`text-sm ${t.textMuted}`}>No attendance records yet.</div>
        )}
      </div>
    </div>
  )
}

export default AdminAttendance

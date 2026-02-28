import React, { useEffect, useState } from 'react'
import { getTheme } from '../../theme'
import { apiUrl } from '../../utils/api'

const EmployeeAttendance = ({ themeMode = 'light' }) => {
  const t = getTheme(themeMode)
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('present')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const loadEntries = async () => {
    try {
      setLoading(true)
      const res = await fetch(apiUrl('/api/attendance/me'), { credentials: 'include' })
      if (!res.ok) return
      const data = await res.json()
      setEntries(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEntries()
  }, [])

  const submitAttendance = async () => {
    setMessage('')
    const res = await fetch(apiUrl('/api/attendance'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status, note }),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      setMessage(data.message || 'Unable to record attendance.')
      return
    }
    setMessage('Attendance recorded.')
    setNote('')
    await loadEntries()
    window.setTimeout(() => setMessage(''), 2500)
  }

  return (
    <div className={`rounded-2xl border ${t.border} ${t.card} p-6 shadow-sm panel-reveal`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className={`text-lg font-semibold ${t.text}`}>Today's Attendance</h3>
          <p className={`text-sm ${t.textMuted}`}>Submit your status for today.</p>
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={`text-sm ${t.textMuted}`}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`mt-2 w-full rounded-xl border ${t.border} ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-white text-slate-900'} px-4 py-3 text-sm focus:border-slate-900 focus:outline-none`}
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="leave">Leave</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={`text-sm ${t.textMuted}`}>Note (optional)</label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`mt-2 w-full rounded-xl border ${t.border} ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-white text-slate-900'} px-4 py-3 text-sm focus:border-slate-900 focus:outline-none`}
            placeholder="Meeting offsite, medical appointment, etc."
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={submitAttendance} className={`rounded-xl px-4 py-2 text-sm font-semibold border ${t.buttonPrimary}`}>
          Save Attendance
        </button>
        {message && <span className={`text-xs ${t.textMuted}`}>{message}</span>}
      </div>

      <div className="mt-8">
        <h4 className={`text-sm font-semibold ${t.text}`}>Previous Attendance</h4>
        <div className="mt-3 space-y-2">
          {loading ? (
            <div className={`text-sm ${t.textMuted}`}>Loading attendance...</div>
          ) : entries.length ? (
            entries.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded-xl border ${t.border} ${t.cardSoft} px-4 py-3 text-sm`}
              >
                <span className={t.text}>{item.date}</span>
                <span className={`text-xs uppercase tracking-widest ${t.textMuted}`}>{item.status}</span>
              </div>
            ))
          ) : (
            <div className={`text-sm ${t.textMuted}`}>No attendance records yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeAttendance

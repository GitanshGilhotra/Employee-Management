import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { getTheme } from '../../theme'

const AllTask = ({ themeMode = 'light' }) => {
  const [userData] = useContext(AuthContext)
  const t = getTheme(themeMode)

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
        {userData.map((elem, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between rounded-xl border ${t.border} ${t.cardSoft} px-4 py-3 text-sm ${t.textMuted}`}
          >
            <span className={`w-1/5 font-medium ${t.text}`}>{elem.firstName}</span>
            <span className="w-1/5 text-center">{elem.taskCounts.newTask}</span>
            <span className="w-1/5 text-center">{elem.taskCounts.active}</span>
            <span className="w-1/5 text-center">{elem.taskCounts.completed}</span>
            <span className="w-1/5 text-center">{elem.taskCounts.failed}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTask

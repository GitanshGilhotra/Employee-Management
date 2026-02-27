import React from 'react'
import { getTheme } from '../../theme'

const CompleteTask = ({ data, themeMode = 'light' }) => {
  const t = getTheme(themeMode)

  return (
    <div className={`flex-shrink-0 h-full w-[300px] rounded-2xl border ${t.border} ${t.card} p-5 shadow-sm panel-reveal`}>
      <div className="flex justify-between items-center">
        <span className={`text-xs font-semibold uppercase tracking-widest ${t.textMuted}`}>{data.category}</span>
        <span className={`text-xs ${t.textSubtle}`}>{data.taskDate}</span>
      </div>
      <h2 className={`mt-5 text-lg font-semibold ${t.text}`}>{data.taskTitle}</h2>
      <p className={`text-sm mt-2 ${t.textMuted}`}>{data.taskDescription}</p>
      <div className="mt-6">
        <button className={`w-full rounded-lg font-medium py-2 px-3 text-xs border ${t.buttonPrimary}`}>
          Complete
        </button>
      </div>
    </div>
  )
}

export default CompleteTask

import React from 'react'
import { getTheme } from '../../theme'

const formatDate = (value) => {
  if (!value) return 'No due date'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString()
}

const FailedTask = ({ data, onStatusChange, themeMode = 'light' }) => {
  const t = getTheme(themeMode)
  const category = data.category || 'General'

  const handleRestore = async () => {
    if (!window.confirm('Restore this failed task back to active?')) return
    if (onStatusChange) {
      await onStatusChange(data.id, 'active')
    }
  }

  return (
    <div className={`flex-shrink-0 h-full w-[300px] rounded-2xl border ${t.border} ${t.card} p-5 shadow-sm panel-reveal`}>
      <div className="flex justify-between items-center">
        <span className={`text-xs font-semibold uppercase tracking-widest ${t.textMuted}`}>{category}</span>
        <span className={`text-xs ${t.textSubtle}`}>{formatDate(data.dueDate)}</span>
      </div>
      <h2 className={`mt-5 text-lg font-semibold ${t.text}`}>{data.title}</h2>
      <p className={`text-sm mt-2 ${t.textMuted}`}>{data.description}</p>
      <div className="mt-6 flex flex-col gap-2">
        <button className={`w-full rounded-lg font-medium py-2 px-3 text-xs border ${t.border} ${t.textMuted}`} disabled>
          Failed
        </button>
        <button className={`w-full rounded-lg font-medium py-2 px-3 text-xs border ${t.buttonPrimary}`} onClick={handleRestore}>
          Restore Task
        </button>
      </div>
    </div>
  )
}

export default FailedTask

import React from 'react'
import { getTheme } from '../../theme'

const formatDate = (value) => {
  if (!value) return 'No due date'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString()
}

const AcceptTask = ({ data, onStatusChange, themeMode = 'light' }) => {
  const t = getTheme(themeMode)
  const category = data.category || 'General'

  const handleStatusChange = async (status) => {
    const confirmationText = status === 'completed' ? 'Mark this task as completed?' : 'Mark this task as failed?'
    if (!window.confirm(confirmationText)) return
    if (onStatusChange) {
      await onStatusChange(data.id, status)
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
      <div className="flex justify-between mt-6 gap-2">
        <button className={`rounded-lg font-medium py-2 px-3 text-xs border ${t.buttonPrimary}`} onClick={() => handleStatusChange('completed')}>
          Mark as Completed
        </button>
        <button className={`rounded-lg font-medium py-2 px-3 text-xs border ${t.buttonOutline}`} onClick={() => handleStatusChange('failed')}>
          Mark as Failed
        </button>
      </div>
    </div>
  )
}

export default AcceptTask

import React from 'react'
import { getTheme } from '../../theme'

const TaskListNumbers = ({ data, themeMode = 'light' }) => {
  const t = getTheme(themeMode)

  return (
    <div className="flex mt-10 justify-between gap-5 screen">
      {[
        { label: 'New Task', value: data.taskCounts.newTask },
        { label: 'Completed Task', value: data.taskCounts.completed },
        { label: 'Accepted Task', value: data.taskCounts.active },
        { label: 'Failed Task', value: data.taskCounts.failed },
      ].map((item, idx) => (
        <div
          key={item.label}
          style={{ animationDelay: `${idx * 60}ms` }}
          className={`rounded-xl w-[45%] py-6 px-9 border ${t.border} ${t.cardSoft} stagger`}
        >
          <h2 className={`text-3xl font-bold ${t.text}`}>{item.value}</h2>
          <h3 className={`text-xl mt-0.5 font-medium ${t.textMuted}`}>{item.label}</h3>
        </div>
      ))}
    </div>
  )
}

export default TaskListNumbers

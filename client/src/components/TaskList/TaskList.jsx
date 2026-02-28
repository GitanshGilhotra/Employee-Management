import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ tasks = [], onStatusChange, themeMode = 'light' }) => {
  const list = Array.isArray(tasks) ? tasks : []

  if (!list.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-sm text-slate-500 dark:border-white/10 dark:bg-white/5">
        No tasks assigned yet. Check back after your next assignment update.
      </div>
    )
  }

  return (
    <div id="tasklist" className="h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16">
      {list.map((elem) => {
        if (elem.status === 'active') {
          return <AcceptTask key={elem.id} data={elem} onStatusChange={onStatusChange} themeMode={themeMode} />
        }
        if (elem.status === 'new') {
          return <NewTask key={elem.id} data={elem} onStatusChange={onStatusChange} themeMode={themeMode} />
        }
        if (elem.status === 'completed') {
          return <CompleteTask key={elem.id} data={elem} themeMode={themeMode} />
        }
        if (elem.status === 'failed') {
          return <FailedTask key={elem.id} data={elem} onStatusChange={onStatusChange} themeMode={themeMode} />
        }
        return null
      })}
    </div>
  )
}

export default TaskList

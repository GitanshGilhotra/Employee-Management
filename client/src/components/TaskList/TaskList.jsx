import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data, themeMode = 'light' }) => {
  const tasks = Array.isArray(data?.tasks) ? data.tasks : []

  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-sm text-slate-500 dark:border-white/10 dark:bg-white/5">
        No tasks assigned yet. Check back after your next assignment update.
      </div>
    )
  }

  return (
    <div id="tasklist" className="h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16">
      {tasks.map((elem, idx) => {
        if (elem.active) {
          return <AcceptTask key={idx} data={elem} taskIndex={idx} themeMode={themeMode} />
        }
        if (elem.newTask) {
          return <NewTask key={idx} data={elem} taskIndex={idx} themeMode={themeMode} />
        }
        if (elem.completed) {
          return <CompleteTask key={idx} data={elem} themeMode={themeMode} />
        }
        if (elem.failed) {
          return <FailedTask key={idx} data={elem} taskIndex={idx} themeMode={themeMode} />
        }
        return null
      })}
    </div>
  )
}

export default TaskList

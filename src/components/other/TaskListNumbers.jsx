import React from 'react'

const TaskListNumbers = ({ data }) => {
  return (
    <div className="flex mt-10 justify-between gap-5 screen">
      <div className="rounded-xl w-[45%] py-6 px-9 bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{data.taskCounts.newTask}</h2>
        <h3 className="text-xl mt-0.5 font-medium text-neutral-600 dark:text-neutral-300">New Task</h3>
      </div>
      <div className="rounded-xl w-[45%] py-6 px-9 bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{data.taskCounts.completed}</h2>
        <h3 className="text-xl mt-0.5 font-medium text-neutral-600 dark:text-neutral-300">Completed Task</h3>
      </div>
      <div className="rounded-xl w-[45%] py-6 px-9 bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{data.taskCounts.active}</h2>
        <h3 className="text-xl mt-0.5 font-medium text-neutral-600 dark:text-neutral-300">Accepted Task</h3>
      </div>
      <div className="rounded-xl w-[45%] py-6 px-9 bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{data.taskCounts.failed}</h2>
        <h3 className="text-xl mt-0.5 font-medium text-neutral-600 dark:text-neutral-300">Failed Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumbers

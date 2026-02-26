import React from 'react'

const CompleteTask = ({ data }) => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 rounded-xl border border-neutral-200 bg-white/90 text-neutral-900 shadow-md dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-100">
      <div className="flex justify-between items-center">
        <h3 className="bg-neutral-900 text-white text-xs px-3 py-1 rounded-full dark:bg-white dark:text-black">{data.category}</h3>
        <h4 className="text-xs text-neutral-600 dark:text-neutral-300">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">{data.taskDescription}</p>
      <div className="mt-6">
        <button className="w-full bg-black text-white rounded font-medium py-1 px-2 text-xs border border-black dark:bg-white dark:text-black dark:border-white">
          Complete
        </button>
      </div>
    </div>
  )
}

export default CompleteTask

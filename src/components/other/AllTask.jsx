import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
  const [userData] = useContext(AuthContext)

  return (
    <div className="bg-white/90 dark:bg-neutral-950/80 p-6 rounded-2xl mt-5 border border-neutral-200 dark:border-neutral-800 shadow-md">
      <div className="bg-neutral-900 text-white dark:bg-white dark:text-black mb-3 py-2 px-4 flex justify-between rounded-lg">
        <h2 className="text-sm font-semibold w-1/5">Employee Name</h2>
        <h3 className="text-sm font-semibold w-1/5">New Task</h3>
        <h5 className="text-sm font-semibold w-1/5">Active Task</h5>
        <h5 className="text-sm font-semibold w-1/5">Completed</h5>
        <h5 className="text-sm font-semibold w-1/5">Failed</h5>
      </div>
      <div>
        {userData.map(function (elem, idx) {
          return (
            <div
              key={idx}
              className="border border-neutral-300 dark:border-neutral-700 mb-2 py-2 px-4 flex justify-between rounded-lg bg-white/80 dark:bg-neutral-900/70"
            >
              <h2 className="text-sm font-medium w-1/5 text-neutral-900 dark:text-neutral-100">{elem.firstName}</h2>
              <h3 className="text-sm font-medium w-1/5 text-neutral-700 dark:text-neutral-300">{elem.taskCounts.newTask}</h3>
              <h5 className="text-sm font-medium w-1/5 text-neutral-700 dark:text-neutral-300">{elem.taskCounts.active}</h5>
              <h5 className="text-sm font-medium w-1/5 text-neutral-900 dark:text-neutral-100">{elem.taskCounts.completed}</h5>
              <h5 className="text-sm font-medium w-1/5 text-neutral-700 dark:text-neutral-300">{elem.taskCounts.failed}</h5>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllTask

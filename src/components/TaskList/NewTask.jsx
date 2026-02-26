import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const NewTask = ({ data, taskIndex }) => {
  const [userData, setUserData] = useContext(AuthContext)

  const handleAccept = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!loggedInUser || !userData) return
    const user = userData.find((u) => u.email === loggedInUser.data.email)
    if (!user) return
    const updatedTasks = user.tasks.map((task, idx) => {
      if (idx === taskIndex) {
        return { ...task, active: true, newTask: false }
      }
      return task
    })
    let { active, completed, failed, newTask } = user.taskCounts
    active += 1
    newTask -= 1
    const updatedUser = {
      ...user,
      tasks: updatedTasks,
      taskCounts: { active, completed, failed, newTask },
    }
    const updatedUserData = userData.map((u) => (u.email === user.email ? updatedUser : u))
    setUserData(updatedUserData)
    localStorage.setItem('employees', JSON.stringify(updatedUserData))
    localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: updatedUser }))
  }

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 rounded-xl border border-neutral-200 bg-white/90 text-neutral-900 shadow-md dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-100">
      <div className="flex justify-between items-center">
        <h3 className="bg-neutral-900 text-white text-xs px-3 py-1 rounded-full dark:bg-white dark:text-black">{data.category}</h3>
        <h4 className="text-xs text-neutral-600 dark:text-neutral-300">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">{data.taskDescription}</p>
      <div className="mt-6">
        <button
          className="bg-black text-white rounded font-medium py-1 px-2 text-xs border border-black hover:bg-neutral-800 transition dark:bg-white dark:text-black dark:border-white dark:hover:bg-neutral-200"
          onClick={handleAccept}
        >
          Accept Task
        </button>
      </div>
    </div>
  )
}

export default NewTask

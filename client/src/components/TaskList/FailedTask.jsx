import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { getTheme } from '../../theme'

const FailedTask = ({ data, taskIndex, themeMode = 'light' }) => {
  const [userData, setUserData] = useContext(AuthContext)
  const t = getTheme(themeMode)

  const handleRestore = () => {
    if (!window.confirm('Restore this failed task back to active?')) return

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!loggedInUser || !userData) return
    const user = userData.find((u) => u.email === loggedInUser.data.email)
    if (!user) return

    const updatedTasks = user.tasks.map((task, idx) => {
      if (idx === taskIndex) {
        return { ...task, failed: false, active: true }
      }
      return task
    })

    let { active, completed, failed, newTask } = user.taskCounts
    failed -= 1
    active += 1

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
    <div className={`flex-shrink-0 h-full w-[300px] rounded-2xl border ${t.border} ${t.card} p-5 shadow-sm panel-reveal`}>
      <div className="flex justify-between items-center">
        <span className={`text-xs font-semibold uppercase tracking-widest ${t.textMuted}`}>{data.category}</span>
        <span className={`text-xs ${t.textSubtle}`}>{data.taskDate}</span>
      </div>
      <h2 className={`mt-5 text-lg font-semibold ${t.text}`}>{data.taskTitle}</h2>
      <p className={`text-sm mt-2 ${t.textMuted}`}>{data.taskDescription}</p>
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

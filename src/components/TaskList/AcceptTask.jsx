import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { getTheme } from '../../theme'

const AcceptTask = ({ data, taskIndex, themeMode = 'light' }) => {
  const [userData, setUserData] = useContext(AuthContext)
  const t = getTheme(themeMode)

  const handleStatusChange = (status) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!loggedInUser || !userData) return
    const user = userData.find((u) => u.email === loggedInUser.data.email)
    if (!user) return
    const updatedTasks = user.tasks.map((task, idx) => {
      if (idx === taskIndex) {
        if (status === 'completed') {
          return { ...task, completed: true, active: false, failed: false, newTask: false }
        } else if (status === 'failed') {
          return { ...task, failed: true, active: false, completed: false, newTask: false }
        }
      }
      return task
    })
    let { active, completed, failed, newTask } = user.taskCounts
    if (status === 'completed') {
      completed += 1
      if (user.tasks[taskIndex].active) active -= 1
      if (user.tasks[taskIndex].newTask) newTask -= 1
    } else if (status === 'failed') {
      failed += 1
      if (user.tasks[taskIndex].active) active -= 1
      if (user.tasks[taskIndex].newTask) newTask -= 1
    }
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

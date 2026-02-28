import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { getTheme } from '../../theme'

const CreateTask = ({ themeMode = 'light' }) => {
  const [userData, setUserData] = useContext(AuthContext)
  const t = getTheme(themeMode)

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [asignTo, setAsignTo] = useState('')
  const [category, setCategory] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    const data = userData.map((elem) => {
      if (asignTo === elem.firstName) {
        const task = {
          taskTitle,
          taskDescription,
          taskDate,
          category,
          active: false,
          newTask: true,
          failed: false,
          completed: false,
        }
        return {
          ...elem,
          tasks: [...elem.tasks, task],
          taskCounts: {
            ...elem.taskCounts,
            newTask: elem.taskCounts.newTask + 1,
          },
        }
      }
      return elem
    })
    setUserData(data)
    localStorage.setItem('employees', JSON.stringify(data))

    setTaskTitle('')
    setCategory('')
    setAsignTo('')
    setTaskDate('')
    setTaskDescription('')
  }

  return (
    <div className={`rounded-2xl border ${t.border} ${t.card} p-6 shadow-sm panel-reveal`}>
      <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={`text-sm ${t.textMuted}`}>Task Title</label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className={`mt-2 w-full rounded-xl border ${t.border} ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-white text-slate-900'} px-4 py-3 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none`}
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div>
            <label className={`text-sm ${t.textMuted}`}>Date</label>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className={`mt-2 w-full rounded-xl border ${t.border} ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-white text-slate-900'} px-4 py-3 text-sm focus:border-slate-900 focus:outline-none`}
              type="date"
            />
          </div>
          <div>
            <label className={`text-sm ${t.textMuted}`}>Assign to</label>
            <input
              value={asignTo}
              onChange={(e) => setAsignTo(e.target.value)}
              className={`mt-2 w-full rounded-xl border ${t.border} ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-white text-slate-900'} px-4 py-3 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none`}
              type="text"
              placeholder="Employee name"
            />
          </div>
          <div>
            <label className={`text-sm ${t.textMuted}`}>Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`mt-2 w-full rounded-xl border ${t.border} ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-white text-slate-900'} px-4 py-3 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none`}
              type="text"
              placeholder="Design, dev, etc"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`text-sm ${t.textMuted}`}>Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className={`mt-2 w-full h-44 rounded-xl border ${t.border} ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-white text-slate-900'} px-4 py-3 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none`}
            ></textarea>
          </div>
          <button className={`w-full rounded-xl py-3 text-sm font-semibold border ${t.buttonPrimary}`}>Create Task</button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask

import React, { useEffect, useState } from 'react'
import { getTheme } from '../../theme'
import { apiUrl } from '../../utils/api'

const CreateTask = ({ themeMode = 'light' }) => {
  const t = getTheme(themeMode)

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [assignTo, setAssignTo] = useState('')
  const [category, setCategory] = useState('')
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoading(true)
        const res = await fetch(apiUrl('/api/employees'), { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        setEmployees(data)
      } finally {
        setLoading(false)
      }
    }
    loadEmployees()
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    setMessage('')

    if (!assignTo) {
      setMessage('Select an employee to assign this task.')
      return
    }

    const res = await fetch(apiUrl('/api/tasks'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDate,
        category,
        assignedTo: assignTo,
      }),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      setMessage(data.message || 'Unable to create task.')
      return
    }

    setTaskTitle('')
    setCategory('')
    setAssignTo('')
    setTaskDate('')
    setTaskDescription('')
    setMessage('Task created successfully.')
    window.setTimeout(() => setMessage(''), 2500)
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
              required
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
              required
              className={`mt-2 w-full rounded-xl border ${t.border} ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-white text-slate-900'} px-4 py-3 text-sm focus:border-slate-900 focus:outline-none`}
              type="date"
            />
          </div>
          <div>
            <label className={`text-sm ${t.textMuted}`}>Assign to</label>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              required
              className={`mt-2 w-full rounded-xl border ${t.border} ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-white text-slate-900'} px-4 py-3 text-sm focus:border-slate-900 focus:outline-none`}
            >
              <option value="">{loading ? 'Loading employees...' : 'Select employee'}</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={`text-sm ${t.textMuted}`}>Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
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
              required
              className={`mt-2 w-full h-44 rounded-xl border ${t.border} ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-white text-slate-900'} px-4 py-3 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none`}
            ></textarea>
          </div>
          <button className={`w-full rounded-xl py-3 text-sm font-semibold border ${t.buttonPrimary}`}>Create Task</button>
          {message && <p className={`text-xs ${t.textMuted}`}>{message}</p>}
        </div>
      </form>
    </div>
  )
}

export default CreateTask

import React, { useEffect, useState } from 'react'
import TaskList from '../TaskList/TaskList'
import EmployeeAttendance from '../attendance/EmployeeAttendance'
import { getTheme } from '../../theme'
import Skeleton from '../ui/Skeleton'
import { apiUrl } from '../../utils/api'

const navLinks = [
  { name: 'Overview', icon: 'O' },
  { name: 'My Tasks', icon: 'T' },
  { name: 'Profile', icon: 'P' },
  { name: 'Attendance', icon: 'A' },
]

const Sidebar = ({ active, setActive, theme }) => {
  const t = getTheme(theme)

  return (
    <aside className={`h-full w-64 flex flex-col border-r ${theme === 'dark' ? 'bg-[#0e1117]' : 'bg-white'} ${t.border}`}>
      <div className="px-6 pt-8 pb-6">
        <div className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${t.cardSoft}`}>
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold font-[Space_Grotesk] ${t.chip}`}>
            EM
          </div>
          <div>
            <p className={`text-sm font-semibold ${t.text}`}>Employee Hub</p>
            <p className={`text-xs ${t.textMuted}`}>Personal Workspace</p>
          </div>
        </div>
      </div>

      <div className="px-4">
        <p className={`px-3 text-xs uppercase tracking-[0.2em] ${t.textSubtle}`}>Navigation</p>
        <div className="mt-4 space-y-2">
          {navLinks.map((link, idx) => {
            const isActive = active === idx
            return (
              <button
                key={link.name}
                onClick={() => setActive(idx)}
                style={{ transitionDelay: `${idx * 30}ms` }}
                className={`nav-item w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                  isActive ? t.navActive : t.navInactive
                } ${isActive ? `is-active ${theme === 'dark' ? 'dark-glow' : ''}` : ''}`}
              >
                <span className={`nav-active-line ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} />
                <span
                  className={`nav-item-icon h-8 w-8 rounded-lg flex items-center justify-center text-xs font-semibold ${
                    isActive ? t.navIconActive : t.navIconInactive
                  }`}
                >
                  {link.icon}
                </span>
                <span>{link.name}</span>
                <span className={`nav-indicator ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} />
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 px-6">
        <div className={`rounded-2xl border p-4 ${t.border} ${t.cardSoft}`}>
          <div className="flex items-center justify-between">
            <p className={`text-xs uppercase tracking-[0.2em] ${t.textSubtle}`}>Status</p>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className={`text-xs ${t.textMuted}`}>On Track</span>
            </span>
          </div>
          <p className={`mt-3 text-xs ${t.textMuted}`}>Focus: Weekly goals</p>
        </div>
      </div>

      <div className="mt-auto px-6 pb-8">
        <div className={`rounded-2xl border p-4 text-xs leading-relaxed ${t.border} ${t.cardSoft} ${t.textMuted}`}>
          Plan your day and keep your tasks moving smoothly.
        </div>
      </div>
    </aside>
  )
}

const Navbar = ({ theme, setTheme, onLogout, activeTasks, newTasks, queueCount }) => {
  const t = getTheme(theme)

  return (
    <nav className={`w-full border-b ${t.border} ${theme === 'dark' ? 'bg-[#0e1117]/90' : 'bg-white/90'} backdrop-blur`}>
      <div className="h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div>
            <h1 className={`text-lg font-semibold ${t.text}`}>Employee Dashboard</h1>
            <p className={`text-xs ${t.textMuted}`}>Your work overview and updates</p>
          </div>
          <span className={`badge-shimmer hidden sm:inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-widest border ${t.border} ${t.textMuted}`}>
            Activity - Live
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${t.buttonPrimary}`}
            title="Toggle theme"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold ${t.chip}`}>
            EM
          </div>
          <button
            onClick={() => (onLogout ? onLogout() : null)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${t.buttonOutline}`}
          >
            Logout
          </button>
        </div>
      </div>
      <div className={`px-8 pb-3 pt-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
        <div className={`flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.2em] ${t.textSubtle}`}>
          <span className="rounded-full border px-3 py-1">Due - {activeTasks}</span>
          <span className="rounded-full border px-3 py-1">New - {newTasks}</span>
          <span className="rounded-full border px-3 py-1">Queue - {queueCount} Items</span>
        </div>
      </div>
    </nav>
  )
}

const EmployeeDashboard = (props) => {
  const [active, setActive] = useState(0)
  const [theme, setTheme] = useState('light')
  const [stats, setStats] = useState(null)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    taskReminders: true,
    darkMode: false,
  })
  const [profileStatus, setProfileStatus] = useState(null)
  const [tasks, setTasks] = useState([])
  const [tasksLoading, setTasksLoading] = useState(true)
  const t = getTheme(theme)
  const isLoading = !props.data
  const activeTasks = stats?.active ?? 0
  const newTasks = stats?.newTasks ?? 0
  const queueCount = activeTasks + newTasks
  const totalTasks = stats?.totalTasks ?? 0
  const completedTasks = stats?.completed ?? 0
  const completionPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0

  const loadStats = async () => {
    try {
      const res = await fetch(apiUrl('/api/stats/me'), { credentials: 'include' })
      if (!res.ok) return
      const data = await res.json()
      setStats(data)
    } catch {
      setStats(null)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setTasksLoading(true)
        const res = await fetch(apiUrl('/api/tasks/me'), { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        setTasks(data)
      } finally {
        setTasksLoading(false)
      }
    }
    loadTasks()
  }, [])

  const handleStatusChange = async (taskId, status) => {
    const res = await fetch(apiUrl(`/api/tasks/${taskId}/status`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status }),
    })
    if (!res.ok) return
    const data = await res.json().catch(() => ({}))
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: data.status || status } : task))
    )
    await loadStats()
  }

  useEffect(() => {
    setSettings((prev) => ({ ...prev, darkMode: theme === 'dark' }))
  }, [theme])

  const handleToggleSetting = (key) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      if (key === 'darkMode') {
        setTheme(next.darkMode ? 'dark' : 'light')
      }
      return next
    })
  }

  const handleUpdateProfile = () => {
    setProfileStatus('Profile updates saved.')
    window.setTimeout(() => setProfileStatus(null), 2500)
  }

  const quickStats = [
    { label: 'Tasks Due', value: activeTasks },
    { label: 'New Tasks', value: newTasks },
    { label: 'Completed', value: completedTasks },
  ]

  const renderSkeletonStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Skeleton key={idx} className="h-24" />
      ))}
    </div>
  )

  const renderSkeletonPanel = () => (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-64 mt-4" />
      <Skeleton className="h-3 w-56 mt-3" />
    </div>
  )

  let pageContent
  if (active === 0) {
    pageContent = (
      <>
        <div className={`mb-6 rounded-2xl border ${t.border} ${t.cardSoft} px-5 py-4 card-hover ${theme === 'dark' ? 'dark' : ''}`}>
          <div className="flex flex-wrap items-center gap-4">
            {quickStats.map((stat) => (
              <div key={stat.label} className="min-w-[140px]">
                <p className={`text-[10px] uppercase tracking-[0.2em] ${t.textSubtle}`}>{stat.label}</p>
                <p className={`mt-2 text-xl font-semibold ${t.text}`}>{stat.value}</p>
              </div>
            ))}
            <div className="ml-auto flex gap-2">
              <button
                className={`rounded-lg px-4 py-2 text-xs font-semibold border ${t.buttonPrimary}`}
                onClick={() => setActive(1)}
              >
                View Tasks
              </button>
              <button
                className={`rounded-lg px-4 py-2 text-xs font-semibold border ${t.buttonOutline}`}
                onClick={() => setActive(2)}
              >
                Profile
              </button>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className={`text-3xl font-semibold ${t.text}`}>
            Welcome back, {props.data?.firstName || 'Employee'}
          </h2>
          <p className={`mt-2 ${t.textMuted}`}>Here's a focused view of your current work.</p>
        </div>

        {isLoading ? (
          renderSkeletonStats()
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 stagger">
            {[
              { label: 'New Tasks', value: stats?.newTasks ?? 0 },
              { label: 'Active Tasks', value: stats?.active ?? 0 },
              { label: 'Completed', value: stats?.completed ?? 0 },
              { label: 'Failed', value: stats?.failed ?? 0 },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                style={{ animationDelay: `${idx * 60}ms` }}
                className={`rounded-2xl p-6 border ${t.border} ${t.cardSoft} card-hover ${theme === 'dark' ? 'dark' : ''}`}
              >
                <p className={`text-xs uppercase tracking-[0.2em] ${t.textSubtle}`}>{stat.label}</p>
                <p className={`mt-4 text-3xl font-semibold ${t.text}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {isLoading ? (
            <>
              {renderSkeletonPanel()}
              {renderSkeletonPanel()}
            </>
          ) : (
            <>
              <div className={`rounded-2xl border ${t.border} ${t.card} p-6 panel-reveal card-hover ${theme === 'dark' ? 'dark' : ''}`}>
                <h3 className={`text-lg font-semibold ${t.text}`}>Today's Progress</h3>
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className={t.textMuted}>Completion Rate</span>
                    <span className={t.text}>{completionPercent}%</span>
                  </div>
                  <div className={`mt-3 h-2 w-full rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}>
                    <div
                      className={`h-2 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-slate-900'}`}
                      style={{ width: `${completionPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl border ${t.border} ${t.card} p-6 panel-reveal card-hover ${theme === 'dark' ? 'dark' : ''}`}>
                <h3 className={`text-lg font-semibold ${t.text}`}>Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <button className={`w-full rounded-lg px-4 py-3 text-sm font-semibold border ${t.buttonPrimary}`} onClick={() => setActive(1)}>
                    View All Tasks
                  </button>
                  <button className={`w-full rounded-lg px-4 py-3 text-sm font-semibold border ${t.buttonGhost}`} onClick={() => setActive(1)}>
                    Review Task List
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {isLoading ? (
          renderSkeletonPanel()
        ) : (
          <div className={`rounded-2xl border ${t.border} ${t.card} p-6 panel-reveal card-hover ${theme === 'dark' ? 'dark' : ''}`}>
            <h3 className={`text-lg font-semibold ${t.text}`}>Recent Activity</h3>
            <ul className="mt-4 divide-y divide-slate-100/30">
              {tasks.slice(0, 4).map((task) => (
                <li key={task.id} className={`py-3 text-sm ${t.textMuted}`}>
                  {task.title} - {task.status}
                </li>
              ))}
              {!tasks.length && <li className={`py-3 text-sm ${t.textMuted}`}>No recent task activity.</li>}
            </ul>
          </div>
        )}
      </>
    )
  } else if (active === 1) {
    pageContent = (
      <>
        <div className="mb-10">
          <h2 className={`text-3xl font-semibold ${t.text}`}>My Tasks</h2>
          <p className={`mt-2 ${t.textMuted}`}>Manage and track all your assigned tasks.</p>
        </div>
        {isLoading ? (
          renderSkeletonStats()
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 stagger">
            {[
              { label: 'In Progress', value: stats?.active ?? 0 },
              { label: 'Completed', value: stats?.completed ?? 0 },
              { label: 'Failed', value: stats?.failed ?? 0 },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                style={{ animationDelay: `${idx * 60}ms` }}
                className={`rounded-2xl p-6 border ${t.border} ${t.cardSoft} card-hover ${theme === 'dark' ? 'dark' : ''}`}
              >
                <p className={`text-xs uppercase tracking-[0.2em] ${t.textSubtle}`}>{stat.label}</p>
                <p className={`mt-4 text-3xl font-semibold ${t.text}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}
        <div className={`rounded-2xl border ${t.border} ${t.card} p-6 panel-reveal card-hover ${theme === 'dark' ? 'dark' : ''}`}>
          <h3 className={`text-lg font-semibold ${t.text}`}>Task List</h3>
          {tasksLoading ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} className="h-48" />
              ))}
            </div>
          ) : (
            <TaskList tasks={tasks} onStatusChange={handleStatusChange} themeMode={theme} />
          )}
        </div>
      </>
    )
  } else if (active === 2) {
    pageContent = (
      <>
        <div className="mb-10">
          <h2 className={`text-3xl font-semibold ${t.text}`}>My Profile</h2>
          <p className={`mt-2 ${t.textMuted}`}>Manage your account settings and preferences.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`rounded-2xl border ${t.border} ${t.card} p-6 panel-reveal card-hover ${theme === 'dark' ? 'dark' : ''}`}>
            <h3 className={`text-lg font-semibold ${t.text}`}>Personal Information</h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-lg font-semibold ${t.chip}`}>
                  {props.data?.firstName?.charAt(0) || 'E'}
                </div>
                <div>
                  <p className={`text-base font-semibold ${t.text}`}>{props.data?.firstName || 'Employee'}</p>
                  <p className={`text-sm ${t.textMuted}`}>{props.data?.email || 'employee@example.com'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className={t.textMuted}>Employee ID</span>
                  <span className={t.text}>{props.data?.id || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={t.textMuted}>Role</span>
                  <span className={t.text}>Employee</span>
                </div>
                <div className="flex justify-between">
                  <span className={t.textMuted}>Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs border ${t.border} ${t.textMuted}`}>Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl border ${t.border} ${t.card} p-6 panel-reveal card-hover ${theme === 'dark' ? 'dark' : ''}`}>
            <h3 className={`text-lg font-semibold ${t.text}`}>Account Settings</h3>
            <div className="mt-6 space-y-4">
              {[
                { label: 'Email Notifications', key: 'emailNotifications' },
                { label: 'Task Reminders', key: 'taskReminders' },
                { label: 'Dark Mode', key: 'darkMode' },
              ].map((setting) => {
                const isActive = settings[setting.key]
                return (
                  <div key={setting.label} className="flex items-center justify-between text-sm">
                    <span className={t.textMuted}>{setting.label}</span>
                    <button
                      className={`h-6 w-12 rounded-full border ${isActive ? t.buttonPrimary : t.buttonGhost}`}
                      onClick={() => handleToggleSetting(setting.key)}
                      aria-pressed={isActive}
                    >
                      <span
                        className={`block h-4 w-4 rounded-full transition ${isActive ? 'translate-x-6' : 'translate-x-1'} ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
                      />
                    </button>
                  </div>
                )
              })}
              {profileStatus ? <p className={`text-xs ${t.textMuted}`}>{profileStatus}</p> : null}
              <button className={`mt-4 w-full rounded-lg px-4 py-3 text-sm font-semibold border ${t.buttonPrimary}`} onClick={handleUpdateProfile}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </>
    )
  } else if (active === 3) {
    pageContent = <EmployeeAttendance themeMode={theme} />
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className={`flex h-screen w-full ${t.bgPage} transition-colors duration-300`}>
        <Sidebar active={active} setActive={setActive} theme={theme} />
        <div className="flex-1 flex flex-col">
          <Navbar
            theme={theme}
            setTheme={setTheme}
            onLogout={props.onLogout}
            activeTasks={activeTasks}
            newTasks={newTasks}
            queueCount={queueCount}
          />
          <main className="flex-1 overflow-y-auto p-8">
            <div className={`w-full max-w-6xl rounded-3xl border ${t.border} ${t.bgPanel} p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ${t.text} content-texture ${theme === 'dark' ? 'dark' : ''}`}>
              <div key={active} className="page-fade">
                {pageContent}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard


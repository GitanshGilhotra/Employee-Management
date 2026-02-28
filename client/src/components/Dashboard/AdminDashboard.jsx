import React, { useEffect, useState } from 'react'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import { getTheme } from '../../theme'

const navLinks = [
  { name: 'Overview', icon: 'O' },
  { name: 'Create Task', icon: 'C' },
  { name: 'All Tasks', icon: 'A' },
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
            <p className={`text-xs ${t.textMuted}`}>Admin Console</p>
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
            )}
          )}
        </div>
      </div>

      <div className="mt-8 px-6">
        <div className={`rounded-2xl border p-4 ${t.border} ${t.cardSoft}`}>
          <div className="flex items-center justify-between">
            <p className={`text-xs uppercase tracking-[0.2em] ${t.textSubtle}`}>Status</p>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className={`text-xs ${t.textMuted}`}>Operational</span>
            </span>
          </div>
          <p className={`mt-3 text-xs ${t.textMuted}`}>Reporting cadence: Weekly</p>
        </div>
      </div>

      <div className="mt-auto px-6 pb-8">
        <div className={`rounded-2xl border p-4 text-xs leading-relaxed ${t.border} ${t.cardSoft} ${t.textMuted}`}>
          Keep your team aligned with structured tasks and weekly reviews.
        </div>
      </div>
    </aside>
  )
}

const Navbar = ({ theme, setTheme, onLogout }) => {
  const t = getTheme(theme)

  return (
    <nav className={`w-full border-b ${t.border} ${theme === 'dark' ? 'bg-[#0e1117]/90' : 'bg-white/90'} backdrop-blur`}>
      <div className="h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div>
            <h1 className={`text-lg font-semibold ${t.text}`}>Admin Dashboard</h1>
            <p className={`text-xs ${t.textMuted}`}>Manage operations and team performance</p>
          </div>
          <span className={`badge-shimmer hidden sm:inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-widest border ${t.border} ${t.textMuted}`}>
            Activity � Live
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
            AD
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
          <span className="rounded-full border px-3 py-1">KPI � 92% On-time</span>
          <span className="rounded-full border px-3 py-1">Risk � Low</span>
          <span className="rounded-full border px-3 py-1">Queue � 8 Items</span>
        </div>
      </div>
    </nav>
  )
}

const AdminDashboard = (props) => {
  const [active, setActive] = useState(0)
  const [theme, setTheme] = useState('light')
  const [stats, setStats] = useState(null)
  const t = getTheme(theme)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch('/api/stats/admin', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        setStats(data)
      } catch {
        setStats(null)
      }
    }
    loadStats()
  }, [])

  const quickStats = [
    { label: 'Team Health', value: '98%' },
    { label: 'Open Reviews', value: '6' },
    { label: 'Pending', value: '4' },
  ]

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
                Create Task
              </button>
              <button
                className={`rounded-lg px-4 py-2 text-xs font-semibold border ${t.buttonOutline}`}
                onClick={() => setActive(2)}
              >
                View All Tasks
              </button>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className={`text-3xl font-semibold ${t.text}`}>Welcome, Admin</h2>
          <p className={`mt-2 ${t.textMuted}`}>Review activity, manage assignments, and keep the team aligned.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 stagger">
          {[
            { label: 'Employees', value: stats?.employees ?? 0 },
            { label: 'Total Tasks', value: stats?.totalTasks ?? 0 },
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`rounded-2xl border ${t.border} ${t.card} p-6 panel-reveal card-hover ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${t.text}`}>Operational Summary</h3>
              <span className={`text-xs ${t.textMuted}`}>Last 7 days</span>
            </div>
            <ul className="divide-y divide-slate-100/30">
              {[
                'On-time delivery rate above target',
                'Two high-priority blockers resolved',
                'Three cross-team handoffs completed',
                'Upcoming client review scheduled',
              ].map((item) => (
                <li key={item} className={`py-3 text-sm ${t.textMuted}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={`rounded-2xl border ${t.border} ${t.card} p-6 panel-reveal card-hover ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${t.text}`}>Recent Activity</h3>
              <span className={`text-xs ${t.textMuted}`}>Today</span>
            </div>
            <ul className="divide-y divide-slate-100/30">
              {[
                'New employee "John Doe" joined the team',
                'Task "Update website" completed by Sarah',
                'New task "Fix bugs" assigned to Mike',
                'Weekly performance report generated',
              ].map((item) => (
                <li key={item} className={`py-3 text-sm ${t.textMuted}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  } else if (active === 1) {
    pageContent = <CreateTask themeMode={theme} />
  } else if (active === 2) {
    pageContent = <AllTask themeMode={theme} />
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className={`flex h-screen w-full ${t.bgPage} transition-colors duration-300`}>
        <Sidebar active={active} setActive={setActive} theme={theme} />
        <div className="flex-1 flex flex-col">
          <Navbar theme={theme} setTheme={setTheme} onLogout={props.onLogout} />
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

export default AdminDashboard

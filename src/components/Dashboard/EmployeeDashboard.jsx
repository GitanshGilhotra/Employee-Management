import React, { useState } from 'react'
import TaskList from '../TaskList/TaskList'

const navLinks = [
  { name: 'Dashboard', icon: '🏠' },
  { name: 'Tasks', icon: '📝' },
  { name: 'Profile', icon: '👤' },
]

const Sidebar = ({ active, setActive, theme }) => (
  <aside
    className={`h-full w-24 flex flex-col items-center py-8 shadow-xl border-r ${
      theme === 'dark'
        ? 'bg-neutral-950 text-neutral-100 border-neutral-800'
        : 'bg-white text-neutral-900 border-neutral-200'
    }`}
  >
    {navLinks.map((link, idx) => {
      const isActive = active === idx
      return (
        <button
          key={link.name}
          onClick={() => setActive(idx)}
          className={`my-3 flex flex-col items-center group relative transition-all duration-300 px-2 py-3 w-20 rounded-xl border ${
            isActive
              ? theme === 'dark'
                ? 'bg-neutral-900 text-white border-neutral-700 shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                : 'bg-neutral-100 text-neutral-900 border-neutral-300 shadow-[0_0_20px_rgba(0,0,0,0.08)]'
              : theme === 'dark'
                ? 'text-neutral-300 border-transparent hover:bg-neutral-900/70'
                : 'text-neutral-600 border-transparent hover:bg-neutral-100'
          }`}
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">{link.icon}</span>
          <span className={`text-xs mt-1 ${isActive ? 'opacity-100' : 'opacity-70'} transition-opacity`}>
            {link.name}
          </span>
          <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-current opacity-0 group-hover:opacity-30 transition-opacity" />
        </button>
      )
    })}
  </aside>
)

const Navbar = ({ theme, setTheme, onLogout }) => (
  <nav
    className={`w-full h-16 flex items-center justify-between px-8 backdrop-blur-md border-b ${
      theme === 'dark'
        ? 'bg-neutral-950/80 border-neutral-800'
        : 'bg-white/90 border-neutral-200'
    }`}
  >
    <span className={`text-xl font-bold tracking-wide ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
      Employee Dashboard
    </span>
    <div className="flex items-center gap-4">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`p-2 rounded-full border transition ${
          theme === 'dark'
            ? 'bg-white text-black border-white hover:bg-neutral-200'
            : 'bg-black text-white border-black hover:bg-neutral-800'
        }`}
        title="Toggle theme"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      <span
        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-lg border ${
          theme === 'dark'
            ? 'bg-neutral-900 text-white border-neutral-700'
            : 'bg-white text-neutral-900 border-neutral-300'
        }`}
      >
        E
      </span>
      <button
        onClick={onLogout}
        className={`ml-4 px-4 py-2 rounded font-semibold shadow transition border ${
          theme === 'dark'
            ? 'bg-white text-black border-white hover:bg-neutral-200'
            : 'bg-black text-white border-black hover:bg-neutral-800'
        }`}
      >
        Logout
      </button>
    </div>
  </nav>
)

const EmployeeDashboard = (props) => {
  const [active, setActive] = useState(0)
  const [theme, setTheme] = useState('light')

  const lightBg = 'bg-white/90 backdrop-blur-md'
  const darkBg = 'bg-neutral-950/90'
  const lightText = 'text-neutral-900'
  const darkText = 'text-neutral-100'
  const lightHeading = 'text-neutral-900'
  const darkHeading = 'text-white'
  const borderLight = 'border-neutral-200'
  const borderDark = 'border-neutral-800'

  let pageContent
  if (active === 0) {
    pageContent = (
      <>
        <div className="mb-8">
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-2`}>
            Welcome back, {props.data?.firstName || 'Employee'}!
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
            Here's your work overview and recent activities.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'New Tasks', value: props.data?.taskCounts?.newTask || 0 },
            { label: 'Active Tasks', value: props.data?.taskCounts?.active || 0 },
            { label: 'Completed', value: props.data?.taskCounts?.completed || 0 },
            { label: 'Failed', value: props.data?.taskCounts?.failed || 0 },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-6 shadow-lg flex flex-col items-center transition-all duration-300 border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-neutral-950 to-neutral-900 text-neutral-100 border-neutral-800 hover:border-neutral-600'
                  : 'bg-gradient-to-br from-white to-neutral-100 text-neutral-900 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <span className="text-4xl font-bold">{stat.value}</span>
              <span className="mt-2 text-lg font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Today's Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? darkText : 'text-neutral-700'}>Tasks Completed</span>
                <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  {props.data?.taskCounts?.completed || 0}
                </span>
              </div>
              <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'}`}>
                <div
                  className="bg-neutral-900 dark:bg-white h-2 rounded-full"
                  style={{ width: `${Math.min((props.data?.taskCounts?.completed || 0) * 20, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Quick Actions</h3>
            <div className="space-y-3">
              <button className={`w-full p-3 rounded-lg transition border ${theme === 'dark' ? 'bg-white text-black border-white hover:bg-neutral-200' : 'bg-black text-white border-black hover:bg-neutral-800'}`}>
                View All Tasks
              </button>
              <button className={`w-full p-3 rounded-lg transition border ${theme === 'dark' ? 'bg-neutral-900 text-white border-neutral-700 hover:border-neutral-500' : 'bg-white text-black border-neutral-300 hover:border-neutral-500'}`}>
                Mark Task Complete
              </button>
            </div>
          </div>
        </div>
        <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Recent Activity</h3>
          <ul className={`space-y-2 ${theme === 'dark' ? darkText : 'text-neutral-900'}`}>
            <li>✅ You completed "Update website" task</li>
            <li>📝 New task "Fix bugs" assigned to you</li>
            <li>⏰ "Client meeting" task due in 2 hours</li>
            <li>🎯 You're 80% through your weekly goals</li>
          </ul>
        </div>
      </>
    )
  } else if (active === 1) {
    pageContent = (
      <>
        <div className="mb-8">
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-2`}>My Tasks</h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
            Manage and track all your assigned tasks.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'In Progress', value: props.data?.taskCounts?.active || 0 },
            { label: 'Completed', value: props.data?.taskCounts?.completed || 0 },
            { label: 'Failed', value: props.data?.taskCounts?.failed || 0 },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-6 shadow-lg text-center transition-all duration-300 border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-neutral-950 to-neutral-900 text-neutral-100 border-neutral-800 hover:border-neutral-600'
                  : 'bg-gradient-to-br from-white to-neutral-100 text-neutral-900 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <span className="text-3xl font-bold">{stat.value}</span>
              <p className="mt-2 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Task List</h3>
          <TaskList data={props.data} />
        </div>
      </>
    )
  } else if (active === 2) {
    pageContent = (
      <>
        <div className="mb-8">
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-2`}>My Profile</h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
            Manage your account settings and preferences.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold border ${
                    theme === 'dark'
                      ? 'bg-neutral-900 text-white border-neutral-700'
                      : 'bg-white text-neutral-900 border-neutral-300'
                  }`}
                >
                  {props.data?.firstName?.charAt(0) || 'E'}
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-800'}`}>
                    {props.data?.firstName || 'Employee'}
                  </h4>
                  <p className={`${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    {props.data?.email || 'employee@example.com'}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>Employee ID:</span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
                    {props.data?.id || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>Role:</span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
                    Employee
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-sm border ${
                      theme === 'dark'
                        ? 'bg-neutral-900 text-neutral-100 border-neutral-700'
                        : 'bg-neutral-100 text-neutral-900 border-neutral-300'
                    }`}
                  >
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Account Settings</h3>
            <div className="space-y-4">
              {[
                { label: 'Email Notifications', active: true },
                { label: 'Task Reminders', active: true },
                { label: 'Dark Mode', active: theme === 'dark' },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>{setting.label}</span>
                  <button
                    className={`w-12 h-6 rounded-full relative border ${
                      setting.active
                        ? theme === 'dark'
                          ? 'bg-white border-white'
                          : 'bg-black border-black'
                        : theme === 'dark'
                          ? 'bg-neutral-800 border-neutral-700'
                          : 'bg-neutral-200 border-neutral-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full absolute top-1 transition-all ${
                        setting.active ? 'right-1' : 'left-1'
                      } ${setting.active ? 'bg-black' : 'bg-white'} ${theme === 'dark' ? 'shadow-[0_0_8px_rgba(255,255,255,0.15)]' : ''}`}
                    ></div>
                  </button>
                </div>
              ))}
              <button
                className={`w-full p-3 rounded-lg transition mt-6 border ${
                  theme === 'dark'
                    ? 'bg-white text-black border-white hover:bg-neutral-200'
                    : 'bg-black text-white border-black hover:bg-neutral-800'
                }`}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div
        className={`flex h-screen w-full ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-black via-neutral-900 to-neutral-950'
            : 'bg-gradient-to-br from-white via-neutral-100 to-neutral-200'
        } transition-colors duration-500`}
      >
        <Sidebar active={active} setActive={setActive} theme={theme} />
        <div className="flex-1 flex flex-col">
          <Navbar theme={theme} setTheme={setTheme} onLogout={() => props.changeUser('')} />
          <main className="flex-1 flex flex-col items-center justify-start p-8 overflow-y-auto">
            <div
              className={`w-full max-w-5xl ${theme === 'dark' ? darkBg : lightBg} rounded-3xl shadow-2xl p-8 mt-8 border ${
                theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'
              } transition-all duration-300 group relative ${theme === 'dark' ? darkText : lightText}`}
            >
              <div className="absolute -inset-1 rounded-3xl pointer-events-none group-hover:shadow-[0_0_30px_rgba(0,0,0,0.25)] transition-all duration-300" />
              {pageContent}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard

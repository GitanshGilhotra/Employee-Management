import React, { useState } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const navLinks = [
  { name: 'Dashboard', icon: '🏠' },
  { name: 'Tasks', icon: '📝' },
  { name: 'Profile', icon: '👤' },
]

const Sidebar = ({ active, setActive }) => (
  <aside className="h-full w-20 bg-gradient-to-b from-emerald-700 to-blue-700 flex flex-col items-center py-8 shadow-2xl">
    {navLinks.map((link, idx) => (
      <button
        key={link.name}
        onClick={() => setActive(idx)}
        className={`my-3 flex flex-col items-center group relative transition-all duration-300 ${active === idx ? 'border-l-4 border-emerald-400 bg-emerald-900/30 shadow-[0_0_10px_2px_rgba(16,185,129,0.4)]' : 'hover:bg-emerald-800/20'} px-2 py-3 w-16 rounded-xl`}
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">{link.icon}</span>
        <span className="text-xs mt-1 text-white opacity-80 group-hover:opacity-100 transition-opacity">{link.name}</span>
        {/* Spotlight effect */}
        <span className="absolute inset-0 pointer-events-none group-hover:bg-white/10 rounded-xl transition-all duration-300" style={{ boxShadow: active === idx ? '0 0 16px 4px #34d399' : '' }}></span>
      </button>
    ))}
  </aside>
)

const Navbar = ({ theme, setTheme, onLogout }) => (
  <nav className="w-full h-16 flex items-center justify-between px-8 bg-white/70 backdrop-blur-md shadow-lg rounded-b-2xl">
    <span className="text-xl font-bold text-emerald-700 tracking-wide">Employee Dashboard</span>
    <div className="flex items-center gap-4">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 transition"
        title="Toggle theme"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-400 flex items-center justify-center text-white font-bold shadow-lg">E</span>
      <button
        onClick={onLogout}
        className="ml-4 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition"
      >Logout</button>
    </div>
  </nav>
)

const EmployeeDashboard = (props) => {
  const [active, setActive] = useState(0)
  const [theme, setTheme] = useState('light')

  // Helper for light/dark classes
  const lightBg = 'bg-white/90 backdrop-blur-md';
  const darkBg = 'bg-gray-900/80';
  const lightCard = 'bg-gradient-to-tr from-white via-emerald-50 to-blue-50';
  const darkCard = 'bg-gray-800/80';
  const lightText = 'text-gray-800';
  const darkText = 'text-white';
  const lightHeading = 'text-gray-900';
  const darkHeading = 'text-emerald-300';
  const borderLight = 'border-emerald-200';
  const borderDark = 'border-emerald-700';

  // Page content based on sidebar selection
  let pageContent
  if (active === 0) {
    pageContent = <>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-2`}>Welcome back, {props.data?.firstName || 'Employee'}!</h2>
        <p className={`text-lg ${theme === 'dark' ? 'text-emerald-200' : 'text-gray-700'}`}>Here's your work overview and recent activities.</p>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className={`rounded-2xl p-6 shadow-lg flex flex-col items-center group hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 ${theme === 'dark' ? 'bg-gradient-to-tr from-emerald-400 to-blue-400 text-white border-emerald-300/40 hover:border-emerald-400' : 'bg-gradient-to-tr from-emerald-200 to-blue-200 text-gray-800 border-emerald-100 hover:border-emerald-400'}`}> <span className="text-4xl font-bold">{props.data?.taskCounts?.newTask || 0}</span> <span className="mt-2 text-lg font-semibold">New Tasks</span> </div>
        <div className={`rounded-2xl p-6 shadow-lg flex flex-col items-center group hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 ${theme === 'dark' ? 'bg-gradient-to-tr from-blue-400 to-purple-400 text-white border-blue-300/40 hover:border-blue-400' : 'bg-gradient-to-tr from-blue-100 to-purple-100 text-gray-800 border-blue-100 hover:border-blue-400'}`}> <span className="text-4xl font-bold">{props.data?.taskCounts?.active || 0}</span> <span className="mt-2 text-lg font-semibold">Active Tasks</span> </div>
        <div className={`rounded-2xl p-6 shadow-lg flex flex-col items-center group hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 ${theme === 'dark' ? 'bg-gradient-to-tr from-purple-400 to-green-400 text-white border-purple-300/40 hover:border-purple-400' : 'bg-gradient-to-tr from-purple-100 to-green-100 text-gray-800 border-purple-100 hover:border-purple-400'}`}> <span className="text-4xl font-bold">{props.data?.taskCounts?.completed || 0}</span> <span className="mt-2 text-lg font-semibold">Completed</span> </div>
        <div className={`rounded-2xl p-6 shadow-lg flex flex-col items-center group hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 ${theme === 'dark' ? 'bg-gradient-to-tr from-red-400 to-yellow-400 text-white border-red-300/40 hover:border-red-400' : 'bg-gradient-to-tr from-red-100 to-yellow-100 text-gray-800 border-red-100 hover:border-red-400'}`}> <span className="text-4xl font-bold">{props.data?.taskCounts?.failed || 0}</span> <span className="mt-2 text-lg font-semibold">Failed</span> </div>
      </div>
      {/* Task Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Today's Progress</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={theme === 'dark' ? darkText : 'text-gray-700'}>Tasks Completed</span>
              <span className="text-2xl font-bold text-emerald-600">{props.data?.taskCounts?.completed || 0}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.min((props.data?.taskCounts?.completed || 0) * 20, 100)}%` }}></div>
            </div>
          </div>
        </div>
        <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition">View All Tasks</button>
            <button className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">Mark Task Complete</button>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
        <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Recent Activity</h3>
        <ul className={`space-y-2 ${theme === 'dark' ? darkText : ''} ${theme === 'light' ? 'text-gray-900' : ''}`}>
          <li className={theme === 'light' ? 'text-gray-900' : ''}>✅ You completed "Update website" task</li>
          <li className={theme === 'light' ? 'text-gray-900' : ''}>📝 New task "Fix bugs" assigned to you</li>
          <li className={theme === 'light' ? 'text-gray-900' : ''}>⏰ "Client meeting" task due in 2 hours</li>
          <li className={theme === 'light' ? 'text-gray-900' : ''}>🎯 You're 80% through your weekly goals</li>
        </ul>
      </div>
    </>
  } else if (active === 1) {
    pageContent = <>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-2`}>My Tasks</h2>
        <p className={`text-lg ${theme === 'dark' ? 'text-emerald-200' : 'text-gray-700'}`}>Manage and track all your assigned tasks.</p>
      </div>
      {/* Task Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className={`rounded-2xl p-6 shadow-lg text-center group hover:scale-105 transition-all duration-300 ${theme === 'dark' ? 'bg-gradient-to-tr from-blue-400 to-cyan-400 text-white' : 'bg-gradient-to-tr from-blue-100 to-cyan-100 text-gray-800'}`}> <span className="text-3xl font-bold">{props.data?.taskCounts?.active || 0}</span> <p className="mt-2 font-semibold">In Progress</p> </div>
        <div className={`rounded-2xl p-6 shadow-lg text-center group hover:scale-105 transition-all duration-300 ${theme === 'dark' ? 'bg-gradient-to-tr from-green-400 to-emerald-400 text-white' : 'bg-gradient-to-tr from-green-100 to-emerald-100 text-gray-800'}`}> <span className="text-3xl font-bold">{props.data?.taskCounts?.completed || 0}</span> <p className="mt-2 font-semibold">Completed</p> </div>
        <div className={`rounded-2xl p-6 shadow-lg text-center group hover:scale-105 transition-all duration-300 ${theme === 'dark' ? 'bg-gradient-to-tr from-red-400 to-pink-400 text-white' : 'bg-gradient-to-tr from-red-100 to-pink-100 text-gray-800'}`}> <span className="text-3xl font-bold">{props.data?.taskCounts?.failed || 0}</span> <p className="mt-2 font-semibold">Failed</p> </div>
      </div>
      {/* Task List */}
      <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
        <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Task List</h3>
        <TaskList data={props.data} />
      </div>
    </>
  } else if (active === 2) {
    pageContent = <>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-2`}>My Profile</h2>
        <p className={`text-lg ${theme === 'dark' ? 'text-emerald-200' : 'text-gray-700'}`}>Manage your account settings and preferences.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-400 flex items-center justify-center text-white text-2xl font-bold">
                {props.data?.firstName?.charAt(0) || 'E'}
              </div>
              <div>
                <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-emerald-100' : 'text-gray-800'}`}>{props.data?.firstName || 'Employee'}</h4>
                <p className={`${theme === 'dark' ? 'text-emerald-300' : 'text-gray-600'}`}>{props.data?.email || 'employee@example.com'}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-emerald-100' : 'text-gray-700'}>Employee ID:</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-emerald-300' : 'text-gray-800'}`}>{props.data?.id || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-emerald-100' : 'text-gray-700'}>Role:</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-emerald-300' : 'text-gray-800'}`}>Employee</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-emerald-100' : 'text-gray-700'}>Status:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>
        {/* Settings */}
        <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Account Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-emerald-100' : 'text-gray-700'}>Email Notifications</span>
              <button className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-emerald-100' : 'text-gray-700'}>Task Reminders</span>
              <button className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-emerald-100' : 'text-gray-700'}>Dark Mode</span>
              <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
              </button>
            </div>
            <button className="w-full p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition mt-6">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </>
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className={`flex h-screen w-full ${theme === 'dark' ? 'bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-tr from-emerald-50 via-blue-50 to-purple-50'} transition-colors duration-500`}>
        <Sidebar active={active} setActive={setActive} />
        <div className="flex-1 flex flex-col">
          <Navbar theme={theme} setTheme={setTheme} onLogout={() => props.changeUser('')} />
          <main className="flex-1 flex flex-col items-center justify-start p-8 overflow-y-auto">
            <div className={`w-full max-w-5xl ${theme === 'dark' ? darkBg : lightBg} rounded-3xl shadow-2xl p-8 mt-8 border-2 border-emerald-400/60 hover:border-emerald-400 transition-all duration-300 group relative ${theme === 'dark' ? darkText : lightText}`}>
              {/* Glowing border/spotlight */}
              <div className="absolute -inset-1 rounded-3xl pointer-events-none group-hover:shadow-[0_0_32px_8px_rgba(16,185,129,0.4)] transition-all duration-300"></div>
              {pageContent}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
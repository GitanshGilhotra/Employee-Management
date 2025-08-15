import React, { useState } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'

const navLinks = [
  { name: 'Dashboard', icon: '📊' },
  { name: 'Create Task', icon: '➕' },
  { name: 'All Tasks', icon: '📋' },
]

const Sidebar = ({ active, setActive }) => (
  <aside className="h-full w-20 bg-gradient-to-b from-purple-700 to-blue-700 flex flex-col items-center py-8 shadow-2xl">
    {navLinks.map((link, idx) => (
      <button
        key={link.name}
        onClick={() => setActive(idx)}
        className={`my-3 flex flex-col items-center group relative transition-all duration-300 ${active === idx ? 'border-l-4 border-purple-400 bg-purple-900/30 shadow-[0_0_10px_2px_rgba(168,85,247,0.4)]' : 'hover:bg-purple-800/20'} px-2 py-3 w-16 rounded-xl`}
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">{link.icon}</span>
        <span className="text-xs mt-1 text-white opacity-80 group-hover:opacity-100 transition-opacity">{link.name}</span>
        {/* Spotlight effect */}
        <span className="absolute inset-0 pointer-events-none group-hover:bg-white/10 rounded-xl transition-all duration-300" style={{ boxShadow: active === idx ? '0 0 16px 4px #a855f7' : '' }}></span>
      </button>
    ))}
  </aside>
)

const Navbar = ({ theme, setTheme, onLogout }) => (
  <nav className="w-full h-16 flex items-center justify-between px-8 bg-white/70 backdrop-blur-md shadow-lg rounded-b-2xl">
    <span className="text-xl font-bold text-purple-700 tracking-wide">Admin Dashboard</span>
    <div className="flex items-center gap-4">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition"
        title="Toggle theme"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold shadow-lg">A</span>
      <button
        onClick={onLogout}
        className="ml-4 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition"
      >Logout</button>
    </div>
  </nav>
)

const AdminDashboard = (props) => {
  const [active, setActive] = useState(0)
  const [theme, setTheme] = useState('light')

  // Helper for light/dark classes
  const lightBg = 'bg-white/90 backdrop-blur-md';
  const darkBg = 'bg-gray-900/80';
  const lightCard = 'bg-gradient-to-tr from-white via-blue-50 to-purple-50';
  const darkCard = 'bg-gray-800/80';
  const lightText = 'text-gray-800';
  const darkText = 'text-white';
  const lightHeading = 'text-gray-900';
  const darkHeading = 'text-blue-300';
  const borderLight = 'border-blue-200';
  const borderDark = 'border-blue-700';

  // Page content based on sidebar selection
  let pageContent
  if (active === 0) {
    pageContent = <>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-2`}>Welcome, Admin!</h2>
        <p className={`text-lg ${theme === 'dark' ? 'text-blue-200' : 'text-gray-700'}`}>Manage your team and monitor overall performance.</p>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className={`rounded-2xl p-6 shadow-lg flex flex-col items-center group hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 ${theme === 'dark' ? 'bg-gradient-to-tr from-blue-400 to-cyan-400 text-white border-blue-300/40 hover:border-blue-400' : 'bg-gradient-to-tr from-blue-200 to-cyan-200 text-gray-800 border-blue-100 hover:border-blue-400'}`}> <span className="text-4xl font-bold">12</span> <span className="mt-2 text-lg font-semibold">Employees</span> </div>
        <div className={`rounded-2xl p-6 shadow-lg flex flex-col items-center group hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 ${theme === 'dark' ? 'bg-gradient-to-tr from-purple-400 to-pink-400 text-white border-purple-300/40 hover:border-purple-400' : 'bg-gradient-to-tr from-purple-100 to-pink-100 text-gray-800 border-purple-100 hover:border-purple-400'}`}> <span className="text-4xl font-bold">45</span> <span className="mt-2 text-lg font-semibold">Total Tasks</span> </div>
        <div className={`rounded-2xl p-6 shadow-lg flex flex-col items-center group hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 ${theme === 'dark' ? 'bg-gradient-to-tr from-green-400 to-emerald-400 text-white border-green-300/40 hover:border-green-400' : 'bg-gradient-to-tr from-green-100 to-emerald-100 text-gray-800 border-green-100 hover:border-green-400'}`}> <span className="text-4xl font-bold">32</span> <span className="mt-2 text-lg font-semibold">Completed</span> </div>
        <div className={`rounded-2xl p-6 shadow-lg flex flex-col items-center group hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 ${theme === 'dark' ? 'bg-gradient-to-tr from-red-400 to-orange-400 text-white border-red-300/40 hover:border-red-400' : 'bg-gradient-to-tr from-red-100 to-orange-100 text-gray-800 border-red-100 hover:border-red-400'}`}> <span className="text-4xl font-bold">8</span> <span className="mt-2 text-lg font-semibold">Failed</span> </div>
      </div>
      {/* Recent Activity */}
      <div className={`${theme === 'dark' ? darkBg : lightBg} rounded-2xl p-6 shadow-md border ${theme === 'dark' ? borderDark : borderLight}`}>
        <h3 className={`text-xl font-bold ${theme === 'dark' ? darkHeading : lightHeading} mb-4`}>Recent Activity</h3>
        <ul className={`space-y-2 ${theme === 'dark' ? darkText : ''} ${theme === 'light' ? 'text-gray-900' : ''}`}>
          <li className={theme === 'light' ? 'text-gray-900' : ''}>👤 New employee "John Doe" joined the team</li>
          <li className={theme === 'light' ? 'text-gray-900' : ''}>✅ Task "Update website" completed by Sarah</li>
          <li className={theme === 'light' ? 'text-gray-900' : ''}>📝 New task "Fix bugs" assigned to Mike</li>
          <li className={theme === 'light' ? 'text-gray-900' : ''}>⚠️ Task "Client meeting" marked as failed</li>
          <li className={theme === 'light' ? 'text-gray-900' : ''}>📊 Weekly performance report generated</li>
        </ul>
      </div>
    </>
  } else if (active === 1) {
    pageContent = <CreateTask />
  } else if (active === 2) {
    pageContent = <AllTask />
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className={`flex h-screen w-full ${theme === 'dark' ? 'bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-tr from-blue-50 via-purple-50 to-cyan-50'} transition-colors duration-500`}>
        <Sidebar active={active} setActive={setActive} />
        <div className="flex-1 flex flex-col">
          <Navbar theme={theme} setTheme={setTheme} onLogout={() => props.changeUser('')} />
          <main className="flex-1 flex flex-col items-center justify-start p-8 overflow-y-auto">
            <div className={`w-full max-w-5xl ${theme === 'dark' ? darkBg : lightBg} rounded-3xl shadow-2xl p-8 mt-8 border-2 border-blue-400/60 hover:border-blue-400 transition-all duration-300 group relative ${theme === 'dark' ? darkText : lightText}`}>
              {/* Glowing border/spotlight */}
              <div className="absolute -inset-1 rounded-3xl pointer-events-none group-hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.4)] transition-all duration-300"></div>
              {pageContent}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
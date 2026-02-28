import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import ForgotPassword from './components/Auth/ForgotPassword'
import SignUp from './components/Auth/SignUp'
import ResetPassword from './components/Auth/ResetPassword'
import NotFound from './components/Auth/NotFound'
import { AuthContext } from './context/AuthProvider'
import { apiUrl } from './utils/api'

const App = () => {
  const [user, setUser] = React.useState(null)
  const [loggedInUserData, setLoggedInUserData] = React.useState(null)
  const [authLoading, setAuthLoading] = React.useState(true)
  const [userData] = React.useContext(AuthContext)

  const loadSession = React.useCallback(async () => {
    const res = await fetch(apiUrl('/api/auth/me'), { credentials: 'include' })
    if (res.ok) {
      const data = await res.json()
      setUser(data.role)
      setLoggedInUserData(data.data)
      return true
    }
    return false
  }, [])

  React.useEffect(() => {
    const init = async () => {
      try {
        const ok = await loadSession()
        if (!ok) {
          const refresh = await fetch(apiUrl('/api/auth/refresh'), { method: 'POST', credentials: 'include' })
          if (refresh.ok) {
            await loadSession()
          } else {
            setUser(null)
            setLoggedInUserData(null)
          }
        }
      } catch {
        setUser(null)
        setLoggedInUserData(null)
      } finally {
        setAuthLoading(false)
      }
    }
    init()
  }, [loadSession])

  React.useEffect(() => {
    if (user === 'employee' && userData && loggedInUserData) {
      const updated = userData.find((e) => e.email === loggedInUserData.email)
      if (updated) {
        setLoggedInUserData(updated)
      }
    }
  }, [userData, user])

  const handleLogin = async (email, password) => {
    const res = await fetch(apiUrl('/api/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Login failed')
    }

    setUser(data.role)
    setLoggedInUserData(data.data)
  }

  const handleLogout = async () => {
    try {
      await fetch(apiUrl('/api/auth/logout'), { method: 'POST', credentials: 'include' })
    } finally {
      setUser(null)
      setLoggedInUserData(null)
    }
  }

  const renderDashboard = () => {
    if (user === 'admin') return <AdminDashboard changeUser={setUser} onLogout={handleLogout} />
    if (user === 'employee') return <EmployeeDashboard changeUser={setUser} onLogout={handleLogout} data={loggedInUserData} />
    return <Navigate to="/" />
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600">Loading...</div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600">Loading...</div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login handleLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={renderDashboard()} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App


import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import ForgotPassword from './components/Auth/ForgotPassword'
import SignUp from './components/Auth/SignUp'
import NotFound from './components/Auth/NotFound'
import { AuthContext } from './context/AuthProvider'

const App = () => {
  const [user, setUser] = React.useState(null)
  const [loggedInUserData, setLoggedInUserData] = React.useState(null)
  const [userData] = React.useContext(AuthContext)

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userDataObj = JSON.parse(loggedInUser)
      setUser(userDataObj.role)
      setLoggedInUserData(userDataObj.data)
    }
  }, [])

  React.useEffect(() => {
    if (user === 'employee' && userData && loggedInUserData) {
      const updated = userData.find((e) => e.email === loggedInUserData.email)
      if (updated) {
        setLoggedInUserData(updated)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: updated }))
      }
    }
  }, [userData, user])

  const handleLogin = (email, password) => {
    if (email == 'admin@example.com' && password == '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    } else if (userData) {
      const employee = userData.find((e) => email == e.email && e.password == password)
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))
      }
    } else {
      alert('Invalid Credentials')
    }
  }

  const renderDashboard = () => {
    if (user === 'admin') return <AdminDashboard changeUser={setUser} />
    if (user === 'employee') return <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
    return <Navigate to="/" />
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600">
            Loading…
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login handleLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={renderDashboard()} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App

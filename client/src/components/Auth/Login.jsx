import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await handleLogin(email, password)
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err.message || 'Login failed. Try again.')
    }
    setLoading(false)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (error) setError('')
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your team and tasks"
      footer={
        <div className="flex justify-between">
          <Link to="/forgot-password" className="text-slate-600 hover:text-slate-900">
            Forgot password?
          </Link>
          <Link to="/signup" className="text-slate-600 hover:text-slate-900">
            Create account
          </Link>
        </div>
      }
    >
      <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
        <div>
          <label className="text-sm text-slate-600">Email</label>
          <input
            value={email}
            onChange={handleEmailChange}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            type="email"
            placeholder="name@company.com"
          />
        </div>

        <div className="relative">
          <label className="text-sm text-slate-600">Password</label>
          <input
            value={password}
            onChange={handlePasswordChange}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-10 flex items-center gap-1 text-slate-500 hover:text-slate-900"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <span className="text-xs select-none">{showPassword ? 'Hide' : 'Show'}</span>
          </button>
        </div>

        {error && <div className="text-slate-900 text-center text-sm font-medium">{error}</div>}

        <button
          className="mt-2 rounded-xl bg-slate-900 text-white py-3 font-semibold transition hover:bg-black disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login

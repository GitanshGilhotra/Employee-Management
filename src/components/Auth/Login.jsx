import React, { useState } from 'react'

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
      setError('Login failed. Try again.')
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
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-slate-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-slate-300/40 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.12)] px-10 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold font-[Space_Grotesk]">
            EM
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-2">Sign in to manage your team and tasks</p>
        </div>

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

        <div className="flex justify-between mt-6 text-sm">
          <a href="#" className="text-slate-600 hover:text-slate-900">Forgot password?</a>
          <a href="#" className="text-slate-600 hover:text-slate-900">Create account</a>
        </div>
      </div>
    </div>
  )
}

export default Login

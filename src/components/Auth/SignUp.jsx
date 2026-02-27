import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.message || 'Failed to create account.')
      } else {
        setMessage('Account created successfully. You can log in now.')
        setForm({ name: '', email: '', password: '' })
      }
    } catch (err) {
      setMessage('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
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
          <h1 className="text-3xl font-semibold text-slate-900">Create account</h1>
          <p className="text-slate-500 mt-2">Join your team workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div>
            <label className="text-sm text-slate-600">Full name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
              type="text"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
              type="email"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
              type="password"
              placeholder="Create a password"
            />
          </div>

          <button
            className="mt-2 rounded-xl bg-slate-900 text-white py-3 font-semibold transition hover:bg-black disabled:opacity-60"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create account'}
          </button>
        </form>

        {message && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {message}
          </div>
        )}

        <div className="mt-6 text-sm text-center">
          <Link to="/" className="text-slate-600 hover:text-slate-900">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp

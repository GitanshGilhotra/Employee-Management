import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'

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
    <AuthLayout
      title="Create account"
      subtitle="Join your team workspace."
      footer={
        <Link to="/" className="text-slate-600 hover:text-slate-900">
          Back to login
        </Link>
      }
    >
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
          <p className="mt-2 text-xs text-slate-500">Use 8+ chars with upper, lower, number, and symbol.</p>
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
    </AuthLayout>
  )
}

export default SignUp

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.message || 'Failed to send reset link.')
      } else {
        setMessage(data.message)
        setEmail('')
      }
    } catch (err) {
      setMessage('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Reset password"
      subtitle="We’ll email you a secure reset link."
      footer={
        <Link to="/" className="text-slate-600 hover:text-slate-900">
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <div>
          <label className="text-sm text-slate-600">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            type="email"
            placeholder="name@company.com"
          />
        </div>

        <button
          className="mt-2 rounded-xl bg-slate-900 text-white py-3 font-semibold transition hover:bg-black disabled:opacity-60"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Sending...' : 'Send reset link'}
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

export default ForgotPassword

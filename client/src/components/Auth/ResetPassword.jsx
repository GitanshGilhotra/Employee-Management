import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import { apiUrl } from '../../utils/api'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const email = searchParams.get('email') || ''

  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')
    try {
      const res = await fetch(apiUrl('/api/auth/reset-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.message || 'Failed to reset password.')
      } else {
        setMessage(data.message)
        setPassword('')
      }
    } catch (err) {
      setMessage('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const isTokenMissing = !token || !email

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password to secure your account."
      footer={
        <Link to="/" className="text-slate-600 hover:text-slate-900">
          Back to login
        </Link>
      }
    >
      {isTokenMissing ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          This reset link is missing required information. Please request a new reset email.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div>
            <label className="text-sm text-slate-600">New password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
              type="password"
              placeholder="Enter a new password"
            />
            <p className="mt-2 text-xs text-slate-500">Use 8+ chars with upper, lower, number, and symbol.</p>
          </div>

          <button
            className="mt-2 rounded-xl bg-slate-900 text-white py-3 font-semibold transition hover:bg-black disabled:opacity-60"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Update password'}
          </button>
        </form>
      )}

      {message && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          {message}
        </div>
      )}
    </AuthLayout>
  )
}

export default ResetPassword


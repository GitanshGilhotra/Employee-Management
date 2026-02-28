import React from 'react'
import { Link } from 'react-router-dom'

const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-28 -left-24 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-slate-300/50 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md">
          <div className="mb-6 inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-500">
            Employee Management
          </div>
          <h1 className="text-4xl font-semibold text-slate-900">A clean workspace for high-performing teams.</h1>
          <p className="mt-4 text-slate-600">
            Keep tasks aligned, track performance, and manage operations with a single, structured dashboard.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-slate-900" />
              Secure auth with session control
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-slate-900" />
              Clear views for admins and employees
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-slate-900" />
              Password reset with real email delivery
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center px-6 py-12">
        <div className="absolute inset-0 pointer-events-none lg:hidden">
          <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-slate-200/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-slate-300/40 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.12)] px-10 py-12">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold font-[Space_Grotesk]">
              EM
            </div>
            <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
            <p className="text-slate-500 mt-2">{subtitle}</p>
          </div>
          {children}
          {footer ? <div className="mt-6 text-sm text-center">{footer}</div> : null}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

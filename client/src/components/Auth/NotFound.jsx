import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="text-center max-w-md rounded-3xl border border-slate-200 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.12)] px-10 py-12">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold font-[Space_Grotesk]">
          EM
        </div>
        <h1 className="text-4xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you are looking for doesn’t exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-slate-900 text-white px-6 py-3 text-sm font-semibold hover:bg-black"
        >
          Back to login
        </Link>
      </div>
    </div>
  )
}

export default NotFound

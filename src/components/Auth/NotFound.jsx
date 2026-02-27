import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="text-center max-w-md">
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

import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            await handleLogin(email, password)
            setEmail("")
            setPassword("")
        } catch (err) {
            setError("Login failed. Try again.")
        }
        setLoading(false)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (error) setError("")
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (error) setError("")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800">
            <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-neutral-200 rounded-2xl px-10 py-12 w-full max-w-md flex flex-col items-center">
                <h1 className="text-3xl font-extrabold text-neutral-900 mb-2 text-center tracking-tight">Welcome Back</h1>
                <p className="text-neutral-600 mb-8 text-center">Sign in to your account to continue</p>
                <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
                    <div>
                        <input
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="w-full outline-none bg-white/80 border-2 border-neutral-300 focus:border-neutral-900 font-medium text-base py-3 px-5 rounded-xl placeholder:text-neutral-400 transition font-sans"
                            type="email"
                            placeholder="Email address"
                        />
                    </div>
                    <div className="relative">
                        <input
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="w-full outline-none bg-white/80 border-2 border-neutral-300 focus:border-neutral-900 font-medium text-base py-3 px-5 rounded-xl placeholder:text-neutral-400 transition pr-12 font-sans"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-neutral-500 hover:text-neutral-900 focus:outline-none"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575m1.664-2.13A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 2.21-.715 4.25-1.925 5.925M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                            <span className="text-xs select-none">{showPassword ? 'Hide' : 'Show'}</span>
                        </button>
                    </div>
                    {error && (
                        <div className="text-neutral-900 text-center text-sm font-medium -mt-2">{error}</div>
                    )}
                    <button
                        className="mt-2 text-white font-semibold bg-neutral-900 hover:bg-black transition py-3 px-8 w-full rounded-xl flex items-center justify-center disabled:opacity-60"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                        ) : null}
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
                <div className="flex justify-between w-full mt-6 text-sm">
                    <a href="#" className="text-neutral-700 hover:text-neutral-900 hover:underline">Forgot password?</a>
                    <span className="text-neutral-400">|
                    </span>
                    <a href="#" className="text-neutral-700 hover:text-neutral-900 hover:underline">Sign up</a>
                </div>
            </div>
        </div>
    )
}

export default Login

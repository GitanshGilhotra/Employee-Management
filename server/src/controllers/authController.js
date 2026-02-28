import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { setSession, getSession, delSession } from '../utils/sessionStore.js'

const emailEnabled = () => process.env.SMTP_DISABLED !== 'true' && Boolean(process.env.SMTP_HOST)

const transporter = emailEnabled()
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null

const passwordStrongEnough = (password) => {
  const minLength = 8
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  return password.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial
}

const emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')

const otpTtlMinutes = () => Number(process.env.OTP_TTL_MINUTES || 10)

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000))

const hashOtp = (otp) => crypto.createHash('sha256').update(otp).digest('hex')

const sendOtpEmail = async (email, otp) => {
  if (!emailEnabled() || !transporter) {
    console.warn(`SMTP disabled or missing. OTP for ${email}: ${otp}`)
    return
  }
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Verify your account',
    text: `Your verification code is ${otp}. It expires in ${otpTtlMinutes()} minutes.`,
  })
}

const sendResetEmail = async (email, resetUrl) => {
  if (!emailEnabled() || !transporter) {
    console.warn(`SMTP disabled or missing. Reset link for ${email}: ${resetUrl}`)
    return
  }
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Reset your password',
    text: `Use the following link to reset your password: ${resetUrl}`,
  })
}

const accessCookieName = () => process.env.COOKIE_NAME || 'ems_access'
const refreshCookieName = () => process.env.REFRESH_COOKIE_NAME || 'ems_refresh'
const cookieSecure = () => process.env.COOKIE_SECURE === 'true'
const cookieSameSite = () => process.env.COOKIE_SAMESITE || 'lax'

const tokenCookieOptions = () => {
  const cookieDays = Number(process.env.COOKIE_DAYS || 7)
  return {
    httpOnly: true,
    sameSite: cookieSameSite(),
    secure: cookieSecure(),
    maxAge: cookieDays * 24 * 60 * 60 * 1000,
  }
}

const clearCookieOptions = () => ({
  httpOnly: true,
  sameSite: cookieSameSite(),
  secure: cookieSecure(),
})

const signAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m' })

const signRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d' })

const refreshTtlSeconds = () => {
  const raw = process.env.REFRESH_TTL_SECONDS
  if (raw) return Number(raw)
  return 7 * 24 * 60 * 60
}

const issueTokens = async (res, payload) => {
  const accessToken = signAccessToken(payload)
  const refreshTokenId = crypto.randomBytes(16).toString('hex')
  const refreshToken = signRefreshToken({ ...payload, jti: refreshTokenId })

  const key = `session:${payload.role}:${payload.id}:${refreshTokenId}`
  await setSession(key, { role: payload.role, id: payload.id }, refreshTtlSeconds())

  res.cookie(accessCookieName(), accessToken, tokenCookieOptions())
  res.cookie(refreshCookieName(), refreshToken, tokenCookieOptions())
}

const clearTokens = async (req, res) => {
  const refreshToken = req.cookies?.[refreshCookieName()]
  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_SECRET)
      const key = `session:${payload.role}:${payload.id}:${payload.jti}`
      await delSession(key)
    } catch {}
  }
  res.clearCookie(accessCookieName(), clearCookieOptions())
  res.clearCookie(refreshCookieName(), clearCookieOptions())
}

const getAccessToken = (req) => req.cookies?.[accessCookieName()]
const getRefreshToken = (req) => req.cookies?.[refreshCookieName()]

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' })
    }

    if (!emailValid(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' })
    }

    if (!passwordStrongEnough(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.',
      })
    }

    const nameLower = name.trim().toLowerCase()
    const existingName = await User.findOne({ nameLower })
    if (existingName) {
      return res.status(409).json({ message: 'An employee with this name already exists.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      if (!existing.isVerified) {
        const otp = generateOtp()
        existing.otpHash = hashOtp(otp)
        existing.otpExpires = new Date(Date.now() + otpTtlMinutes() * 60 * 1000)
        await existing.save()
        await sendOtpEmail(existing.email, otp)
        return res.status(200).json({ message: 'Verification code sent to your email.' })
      }
      return res.status(409).json({ message: 'Email is already registered.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const otp = generateOtp()
    await User.create({
      name,
      nameLower,
      email: email.toLowerCase(),
      passwordHash,
      otpHash: hashOtp(otp),
      otpExpires: new Date(Date.now() + otpTtlMinutes() * 60 * 1000),
      isVerified: false,
    })

    await sendOtpEmail(email, otp)

    return res.status(201).json({ message: 'Account created. Please verify the OTP sent to your email.' })
  } catch (err) {
    console.error(err)
    if (err?.code === 11000) {
      return res.status(409).json({ message: 'Name or email already exists.' })
    }
    return res.status(500).json({ message: 'Server error.' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    if (!emailValid(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' })
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      await issueTokens(res, { role: 'admin', id: 'admin' })
      return res.status(200).json({ role: 'admin', data: null })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' })
    }

    const lockoutThreshold = Number(process.env.LOCKOUT_THRESHOLD || 5)
    const lockoutMinutes = Number(process.env.LOCKOUT_MINUTES || 15)

    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      const remainingMs = user.lockoutUntil.getTime() - Date.now()
      const remainingMin = Math.ceil(remainingMs / 60000)
      return res.status(423).json({ message: `Account locked. Try again in ${remainingMin} minute(s).` })
    }

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) {
      user.failedLoginAttempts += 1
      if (user.failedLoginAttempts >= lockoutThreshold) {
        user.lockoutUntil = new Date(Date.now() + lockoutMinutes * 60 * 1000)
        user.failedLoginAttempts = 0
      }
      await user.save()
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    user.failedLoginAttempts = 0
    user.lockoutUntil = undefined
    await user.save()

    await issueTokens(res, { role: 'employee', id: user._id.toString() })

    return res.status(200).json({
      role: 'employee',
      data: {
        id: user._id,
        firstName: user.name,
        email: user.email,
        taskCounts: { newTask: 0, active: 0, completed: 0, failed: 0 },
        tasks: [],
      },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

export const refresh = async (req, res) => {
  try {
    const refreshToken = getRefreshToken(req)
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token.' })

    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET)
    const key = `session:${payload.role}:${payload.id}:${payload.jti}`
    const session = await getSession(key)
    if (!session) return res.status(401).json({ message: 'Session expired.' })

    await delSession(key)
    await issueTokens(res, { role: payload.role, id: payload.id })
    return res.status(200).json({ message: 'Refreshed.' })
  } catch (err) {
    return res.status(401).json({ message: 'Refresh failed.' })
  }
}

export const me = async (req, res) => {
  try {
    const token = getAccessToken(req)
    if (!token) return res.status(401).json({ message: 'Not authenticated.' })

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if (payload.role === 'admin') {
      return res.status(200).json({ role: 'admin', data: null })
    }

    const user = await User.findById(payload.id)
    if (!user) return res.status(401).json({ message: 'Not authenticated.' })

    return res.status(200).json({
      role: 'employee',
      data: {
        id: user._id,
        firstName: user.name,
        email: user.email,
        taskCounts: { newTask: 0, active: 0, completed: 0, failed: 0 },
        tasks: [],
      },
    })
  } catch (err) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }
}

export const logout = async (req, res) => {
  await clearTokens(req, res)
  res.status(200).json({ message: 'Logged out.' })
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' })
    }

    if (!emailValid(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(200).json({ message: 'If the email exists, a reset link has been sent.' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    user.resetTokenHash = tokenHash
    user.resetTokenExpires = new Date(Date.now() + 1000 * 60 * 30)
    await user.save()

    const resetUrl = `${process.env.CLIENT_ORIGIN}/reset-password?token=${token}&email=${encodeURIComponent(email)}`

    await sendResetEmail(email, resetUrl)

    return res.status(200).json({ message: 'If the email exists, a reset link has been sent.' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body
    if (!email || !token || !password) {
      return res.status(400).json({ message: 'Email, token, and password are required.' })
    }

    if (!emailValid(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' })
    }

    if (!passwordStrongEnough(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.',
      })
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({
      email,
      resetTokenHash: tokenHash,
      resetTokenExpires: { $gt: new Date() },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token.' })
    }

    user.passwordHash = await bcrypt.hash(password, 10)
    user.resetTokenHash = undefined
    user.resetTokenExpires = undefined
    user.failedLoginAttempts = 0
    user.lockoutUntil = undefined
    await user.save()

    return res.status(200).json({ message: 'Password updated successfully.' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' })
    }

    if (!emailValid(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification details.' })
    }

    if (user.isVerified) {
      return res.status(200).json({ message: 'Account already verified.' })
    }

    if (!user.otpHash || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP expired. Please sign up again.' })
    }

    const isMatch = hashOtp(otp) === user.otpHash
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP.' })
    }

    user.isVerified = true
    user.otpHash = undefined
    user.otpExpires = undefined
    await user.save()

    return res.status(200).json({ message: 'Account verified. You can log in now.' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

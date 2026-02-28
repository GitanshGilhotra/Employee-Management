import express from 'express'
import { signUp, forgotPassword, login, resetPassword, me, logout, refresh, verifyOtp } from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/verify-otp', verifyOtp)
router.post('/login', login)
router.post('/refresh', refresh)
router.get('/me', me)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router

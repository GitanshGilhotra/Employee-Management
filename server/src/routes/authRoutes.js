import express from 'express'
import { signUp, forgotPassword } from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/forgot-password', forgotPassword)

export default router

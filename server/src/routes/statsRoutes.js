import express from 'express'
import { adminStats, employeeStats } from '../controllers/statsController.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/admin', requireAuth, requireAdmin, adminStats)
router.get('/me', requireAuth, employeeStats)

export default router

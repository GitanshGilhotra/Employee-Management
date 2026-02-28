import { Router } from 'express'
import { requireAdmin, requireAuth } from '../middleware/auth.js'
import { createAttendance, listAllAttendance, listMyAttendance } from '../controllers/attendanceController.js'

const router = Router()

router.post('/', requireAuth, createAttendance)
router.get('/me', requireAuth, listMyAttendance)
router.get('/', requireAuth, requireAdmin, listAllAttendance)

export default router

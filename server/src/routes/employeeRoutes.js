import { Router } from 'express'
import { listEmployees } from '../controllers/employeeController.js'
import { requireAdmin, requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, requireAdmin, listEmployees)

export default router

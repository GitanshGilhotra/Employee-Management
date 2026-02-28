import { Router } from 'express'
import { requireAdmin, requireAuth } from '../middleware/auth.js'
import { createTask, listTasks, listMyTasks, updateTaskStatus } from '../controllers/taskController.js'

const router = Router()

router.post('/', requireAuth, requireAdmin, createTask)
router.get('/', requireAuth, requireAdmin, listTasks)
router.get('/me', requireAuth, listMyTasks)
router.patch('/:id/status', requireAuth, updateTaskStatus)

export default router

import User from '../models/User.js'
import Task from '../models/Task.js'

export const adminStats = async (req, res) => {
  const [employees, totalTasks, completed, failed, active, newly] = await Promise.all([
    User.countDocuments(),
    Task.countDocuments(),
    Task.countDocuments({ status: 'completed' }),
    Task.countDocuments({ status: 'failed' }),
    Task.countDocuments({ status: 'active' }),
    Task.countDocuments({ status: 'new' }),
  ])

  return res.json({
    employees,
    totalTasks,
    completed,
    failed,
    active,
    newTasks: newly,
  })
}

export const employeeStats = async (req, res) => {
  const userId = req.user?.id
  const [totalTasks, completed, failed, active, newly] = await Promise.all([
    Task.countDocuments({ assignedTo: userId }),
    Task.countDocuments({ assignedTo: userId, status: 'completed' }),
    Task.countDocuments({ assignedTo: userId, status: 'failed' }),
    Task.countDocuments({ assignedTo: userId, status: 'active' }),
    Task.countDocuments({ assignedTo: userId, status: 'new' }),
  ])

  return res.json({
    totalTasks,
    completed,
    failed,
    active,
    newTasks: newly,
  })
}

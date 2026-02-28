import Task from '../models/Task.js'
import User from '../models/User.js'

const isValidStatus = (status) => ['new', 'active', 'completed', 'failed'].includes(status)

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, assignedTo } = req.body
    if (!title || !assignedTo) {
      return res.status(400).json({ message: 'Title and assigned employee are required.' })
    }

    const assignee = await User.findById(assignedTo)
    if (!assignee) return res.status(404).json({ message: 'Employee not found.' })

    const task = await Task.create({
      title,
      description: description || '',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      category: category || 'general',
      assignedTo,
      createdBy: req.user?.id || 'admin',
      status: 'new',
    })

    return res.status(201).json(task)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

export const listTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
    return res.json(
      tasks.map((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        category: task.category,
        status: task.status,
        assignedTo: task.assignedTo
          ? { id: task.assignedTo._id, name: task.assignedTo.name, email: task.assignedTo.email }
          : null,
      }))
    )
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

export const listMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user?.id }).sort({ createdAt: -1 })
    return res.json(
      tasks.map((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        category: task.category,
        status: task.status,
      }))
    )
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!isValidStatus(status)) {
      return res.status(400).json({ message: 'Invalid status.' })
    }

    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task not found.' })

    const isAdmin = req.user?.role === 'admin'
    const isOwner = task.assignedTo?.toString() === req.user?.id
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Forbidden.' })
    }

    task.status = status
    await task.save()

    return res.json({ id: task._id, status: task.status })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

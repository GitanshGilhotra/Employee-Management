import Attendance from '../models/Attendance.js'

const todayKey = () => new Date().toISOString().slice(0, 10)
const allowedStatuses = new Set(['present', 'absent', 'leave'])

export const createAttendance = async (req, res) => {
  try {
    const { status, note } = req.body
    const date = todayKey()
    const attendanceStatus = status || 'present'

    if (!allowedStatuses.has(attendanceStatus)) {
      return res.status(400).json({ message: 'Invalid attendance status.' })
    }

    const existing = await Attendance.findOne({ user: req.user?.id, date })
    if (existing) {
      existing.status = attendanceStatus
      existing.note = note || existing.note
      await existing.save()
      return res.status(200).json({ id: existing._id, date, status: existing.status })
    }

    const entry = await Attendance.create({
      user: req.user?.id,
      date,
      status: attendanceStatus,
      note: note || '',
    })

    return res.status(201).json({ id: entry._id, date, status: entry.status })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

export const listMyAttendance = async (req, res) => {
  try {
    const items = await Attendance.find({ user: req.user?.id }).sort({ date: -1 })
    return res.json(
      items.map((item) => ({
        id: item._id,
        date: item.date,
        status: item.status,
        note: item.note,
      }))
    )
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

export const listAllAttendance = async (req, res) => {
  try {
    const items = await Attendance.find()
      .populate('user', 'name email')
      .sort({ date: -1, createdAt: -1 })

    return res.json(
      items.map((item) => ({
        id: item._id,
        date: item.date,
        status: item.status,
        note: item.note,
        user: item.user
          ? {
              id: item.user._id,
              name: item.user.name,
              email: item.user.email,
            }
          : null,
      }))
    )
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

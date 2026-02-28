import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['present', 'absent', 'leave'], default: 'present' },
    note: { type: String, default: '' },
  },
  { timestamps: true }
)

attendanceSchema.index({ user: 1, date: 1 }, { unique: true })

const Attendance = mongoose.model('Attendance', attendanceSchema)

export default Attendance

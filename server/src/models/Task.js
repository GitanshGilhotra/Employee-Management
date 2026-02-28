import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    dueDate: { type: Date },
    category: { type: String, default: 'general' },
    status: { type: String, enum: ['new', 'active', 'completed', 'failed'], default: 'new' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: String, default: 'system' },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

export default Task

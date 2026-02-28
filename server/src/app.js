import dns from 'node:dns/promises'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import statsRoutes from './routes/statsRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import attendanceRoutes from './routes/attendanceRoutes.js'

dns.setServers(['1.1.1.1', '8.8.8.8'])

const app = express()
const DEFAULT_ORIGINS = [
  'https://employee-management-client-gilt.vercel.app',
  'http://localhost:5173',
]
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim())
  : DEFAULT_ORIGINS

app.set('trust proxy', 1)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (CLIENT_ORIGIN.includes(origin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Employee Management API' })
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'healthy' })
})

app.use('/api/auth', authRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/attendance', attendanceRoutes)

export default app

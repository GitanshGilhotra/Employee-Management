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
const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN ||
  (process.env.NODE_ENV === 'production'
    ? 'https://employee-management-client-gilt.vercel.app'
    : 'http://localhost:5173')

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'healthy' })
})

app.use('/api/auth', authRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/attendance', attendanceRoutes)

export default app

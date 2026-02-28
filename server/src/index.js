import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import statsRoutes from './routes/statsRoutes.js'
import { connectRedis } from './utils/redisClient.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'healthy' })
})

app.use('/api/auth', authRoutes)
app.use('/api/stats', statsRoutes)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')
    await connectRedis()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()


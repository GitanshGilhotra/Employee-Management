import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectRedis } from './utils/sessionStore.js'
import app from './app.js'

dotenv.config()

const PORT = process.env.PORT || 5000

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



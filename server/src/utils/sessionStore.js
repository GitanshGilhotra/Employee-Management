let redis = null
let redisEnabled = false
let memoryStore = new Map()

const connectRedis = async () => {
  const useRedis = process.env.USE_REDIS !== 'false'
  if (!useRedis) {
    console.log('Redis disabled, using in-memory session store')
    return
  }
  const { createClient } = await import('redis')
  redis = createClient({ url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' })
  redis.on('error', (err) => {
    console.error('Redis error', err)
  })
  if (!redis.isOpen) {
    await redis.connect()
    redisEnabled = true
    console.log('Redis connected')
  }
}

const setSession = async (key, value, ttlSeconds) => {
  if (redisEnabled && redis) {
    await redis.set(key, JSON.stringify(value), { EX: ttlSeconds })
    return
  }
  const expiresAt = Date.now() + ttlSeconds * 1000
  memoryStore.set(key, { value, expiresAt })
}

const getSession = async (key) => {
  if (redisEnabled && redis) {
    return redis.get(key)
  }
  const entry = memoryStore.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    memoryStore.delete(key)
    return null
  }
  return JSON.stringify(entry.value)
}

const delSession = async (key) => {
  if (redisEnabled && redis) {
    await redis.del(key)
    return
  }
  memoryStore.delete(key)
}

export { connectRedis, setSession, getSession, delSession }

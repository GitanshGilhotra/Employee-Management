import jwt from 'jsonwebtoken'

const accessCookieName = () => process.env.COOKIE_NAME || 'ems_access'

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.[accessCookieName()]
  if (!token) return res.status(401).json({ message: 'Not authenticated.' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }
}

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden.' })
  return next()
}

import User from '../models/User.js'

export const listEmployees = async (req, res) => {
  try {
    const users = await User.find({}, 'name email').sort({ name: 1 })
    return res.json(
      users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      }))
    )
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  }
}

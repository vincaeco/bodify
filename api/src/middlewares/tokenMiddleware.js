const jwt = require('jsonwebtoken')
const config = require('../../config')

const requireAuthentication = async (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json()
  }

  try {
    const decoded = await jwt.verify(token, config.jwt.secret)
    req.tokenData = decoded.data

    return next()
  } catch (e) {
    return res.status(403).json()
  }
}

module.exports = requireAuthentication

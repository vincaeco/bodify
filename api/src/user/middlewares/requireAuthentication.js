'use strict'

const jwt = require('jsonwebtoken')

const requireAuthentication = async (req, res, next) => {
  const token = req.headers['Authorization']

  if ( ! token) {
    return res.status(401).json()
  }

  const decoded = await jwt.verify(token, process.env.JWT_KEY)

  if (decoded) {
    req.decoded = decoded
    return next()
  }

  return res.status(403)
}

module.exports = requireAuthentication

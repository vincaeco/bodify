'use strict'

const jwt = require('jsonwebtoken')

const requireAuthentication = async (req, res, next) => {
  const token = req.headers['authorization']

  if ( ! token) {
    return res.status(401).json()
  }

  try {
    req.decoded = await jwt.verify(token, process.env.JWT_KEY)

    return next()
  } catch (e) {
    return res.status(403).json()
  }
}

module.exports = requireAuthentication

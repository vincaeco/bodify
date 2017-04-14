'use strict'

const jwt = require('jsonwebtoken')
const config = require('../../config')

const getJWTToken = user => {
  const tokenData = {
    data: {
      _id: user._id,
      name: user.name,
      email: user.email
    }
  }
  const options = {
    expiresIn: "1h"
  }

  return jwt.sign(tokenData, config.jwt.secret, options)
}

module.exports = getJWTToken

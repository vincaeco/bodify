'use strict'

const crypto = require('crypto')

const generateEncryptedPassword = (password) => {
  return crypto.createHmac('sha512', process.env.SECRET_KEY)
    .update(password.toString())
    .digest('hex')
}

module.exports = generateEncryptedPassword

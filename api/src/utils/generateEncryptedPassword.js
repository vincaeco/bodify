'use strict'

const crypto = require('crypto')

const generateEncryptedPassword = (password) => {
  password = password.toString()

  if (password == '') {
    return password
  }

  return crypto.createHmac('sha512', process.env.PASSWORD_HASH)
    .update(password)
    .digest('hex')
}

module.exports = generateEncryptedPassword

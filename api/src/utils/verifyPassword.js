const crypto = require('crypto'),
  generateEncryptedPassword = require('./generateEncryptedPassword')

const verifyPassword = (password, hashedPassword) => {
  if (password === '') {
    throw new Error('Password cannot be in blank')
  }

  return generateEncryptedPassword(password) === hashedPassword
}

module.exports = verifyPassword

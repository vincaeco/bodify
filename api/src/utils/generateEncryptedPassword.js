const crypto = require('crypto')
const config = require('../../config')

const generateEncryptedPassword = (password) => {
  password = password.toString()

  if (password === '') {
    return password
  }

  return crypto.createHmac('sha512', config.password.hash)
    .update(password)
    .digest('hex')
}

module.exports = generateEncryptedPassword

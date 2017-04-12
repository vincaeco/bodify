'use strict'

const User = require('../User')

const listUsers = async (req, res) => {
  const users = await User.find()

  return res.json(users)
}

module.exports = listUsers

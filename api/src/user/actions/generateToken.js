'use strict'

const User = require('../User'),
      verifyPassword = require('../../utils/verifyPassword'),
      jwt = require('jsonwebtoken')

const validateRequest = async (req) => {
  req.checkBody('email').notEmpty().isEmail()
  req.checkBody('password').notEmpty()

  return req.getValidationResult()
}

const generateToken = async (req, res) => {
  const errors = await validateRequest(req)

  if ( ! errors.isEmpty()) {
    return res.status(422).json({error: errors.array()})
  }

  const payload = req.body
  const user = await User.findOne({email: payload.email})

  if ( ! user) {
    return res.status(403).json()
  }

  if ( ! verifyPassword(payload.password, user.password)) {
    return res.status(403).json()
  }

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
  const token = jwt.sign(tokenData, process.env.JWT_KEY, options)

  return res.json({token})
}

module.exports = generateToken

'use strict'

const Evaluatee = require('../Evaluatee')

const validateRequest = async (req) => {
  req.checkBody('name').notEmpty()
  req.checkBody('gender').notEmpty()
  req.checkBody('email').isEmail()

  return req.getValidationResult()
}

const register = async (req, res) => {
  const errors = await validateRequest(req)

  if ( ! errors.isEmpty()) {
    return res.status(422).json({error: errors.array()})
  }
}

module.exports = register

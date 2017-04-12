'use strict'

const Evaluatee = require('../Evaluatee')

const validateRequest = async (req) => {
  req.checkBody('name').notEmpty()
  req.checkBody('gender').notEmpty()

  if (req.body.email) {
    req.checkBody('email').isEmail()
  }

  if (req.body.bornDate) {
    req.checkBody('bornDate').lt(new Date())
  }

  return req.getValidationResult()
}

const register = async (req, res) => {
  if (req.body.bornDate) {
    req.body.bornDate = new Date(req.body.bornDate)
  }

  const errors = await validateRequest(req)
  const payload = req.body

  if ( ! errors.isEmpty()) {
    return res.status(422).json({error: errors.array()})
  }

  let evaluatee = new Evaluatee(payload)
  evaluatee.evaluator = req.tokenData._id

  try {
    const newEvaluatee = await evaluatee.save()

    res.status(201).json(newEvaluatee);
  } catch (errors) {
    console.log(errors)
    res.status(422).json({error: errors.message})
  }
}

module.exports = register

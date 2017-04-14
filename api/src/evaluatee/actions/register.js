const Evaluatee = require('../Evaluatee')

const validateRequest = async (req) => {
  req.checkBody('name').notEmpty()
  req.checkBody('gender').notEmpty()
  req.checkBody('email').optional().isEmail()
  req.checkBody('bornDate').optional().lt(new Date())

  return req.getValidationResult()
}

const register = async (req, res) => {
  if (req.body.bornDate) {
    req.body.bornDate = new Date(req.body.bornDate)
  }

  const errors = await validateRequest(req)
  const payload = req.body

  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()})
  }

  let evaluatee = new Evaluatee(payload)
  evaluatee.evaluator = req.tokenData._id

  try {
    const newEvaluatee = await evaluatee.save()

    res.status(201).json(newEvaluatee)
  } catch (errors) {
    res.status(422).json({error: errors.message})
  }
}

module.exports = register

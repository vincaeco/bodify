const Evaluatee = require('../Evaluatee')

const validateRequest = async (req) => {
  req.checkBody('name').notEmpty()
  req.checkBody('gender').notEmpty()
  req.checkBody('email').optional({ checkFalsy: true }).isEmail()
  req.checkBody('bornDate').optional({ checkFalsy: true }).lt(new Date())

  return req.getValidationResult()
}

const update = async (req, res) => {
  if (req.body.bornDate) {
    req.body.bornDate = new Date(req.body.bornDate)
  }

  const errors = await validateRequest(req)
  const payload = req.body

  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()})
  }

  try {
    let evaluatee = await Evaluatee.findOneAndUpdate(
      {_id: req.params.evaluateeId},
      payload,
      {runValidators: true}
    )

    res.status(200).json(evaluatee)
  } catch (errors) {
    res.status(422).json({error: errors.message})
  }
}

module.exports = update

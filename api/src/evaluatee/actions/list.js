const Evaluatee = require('../Evaluatee')

const listEvaluatees = async (req, res) => {
  const evaluatees = await Evaluatee.find({'evaluator': req.tokenData._id})

  return res.json(evaluatees)
}

module.exports = listEvaluatees

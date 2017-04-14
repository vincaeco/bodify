const Evaluatee = require('../Evaluatee')

const showEvaluatee = async (req, res) => {
  const evaluatee = await Evaluatee.findOne({_id: req.params.evaluateeId})

  res.json(evaluatee)
}

module.exports = showEvaluatee

const Evaluatee = require('../Evaluatee')

const removeEvaluatee = async (req, res) => {
  const evaluatee = await Evaluatee.findOne({_id: req.params.evaluateeId})

  if (!evaluatee) {
    return res.status(404).json()
  }

  await evaluatee.remove()

  res.status(200).json()
}

module.exports = removeEvaluatee

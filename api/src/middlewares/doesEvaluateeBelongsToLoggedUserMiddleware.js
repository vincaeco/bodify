const Evaluatee = require('../evaluatee/Evaluatee')

const doesEvaluateeBelongsToLoggedUserMiddleware = async (req, res, next) => {
  const evaluatee = await Evaluatee.findOne({_id: req.params.evaluateeId})

  if (!evaluatee) {
    return res.status(404).json()
  }

  if (evaluatee.evaluator.toString() !== req.tokenData._id) {
    return res.status(404).json()
  }

  return next()
}

module.exports = doesEvaluateeBelongsToLoggedUserMiddleware

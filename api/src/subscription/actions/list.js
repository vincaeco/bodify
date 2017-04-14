const Subscription = require('../Subscription')

const listSubscriptions = async (req, res) => {
  const subscriptions = await Subscription.find()

  return res.json(subscriptions)
}

module.exports = listSubscriptions

const Subscription = require('../../subscription/Subscription')
const User = require('../User')
const generateEncryptedPassword = require('../../utils/generateEncryptedPassword')

const validateRequest = async (req) => {
  req.checkBody('name').notEmpty()
  req.checkBody('email').notEmpty().isEmail()
  req.checkBody('password').notEmpty()
  req.checkBody('subscriptionId').notEmpty()

  return req.getValidationResult()
}

const signUp = async (req, res) => {
  const errors = await validateRequest(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()})
  }

  const subscription = await Subscription.findById(req.body.subscriptionId)
  let payload = req.body
  payload.subscription = subscription

  if (!subscription) {
    return res.status(422).json({error: 'The subscription was not found'})
  }

  const userRegistered = !!await User.count({email: payload.email})

  if (userRegistered) {
    return res.status(409).json()
  }

  payload.password = generateEncryptedPassword(payload.password)
  const user = new User(payload)

  try {
    const newUser = await user.save()
    await User.populate(newUser, {path: 'subscription'})

    res.status(201).json(newUser)
  } catch (errors) {
    res.status(422).json({error: errors.message})
  }
}

module.exports = signUp

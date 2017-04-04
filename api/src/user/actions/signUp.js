'use strict'

const Subscription = require('../../subscription/Subscription')
const User = require('../User')

const signUp = async (req, res) => {
  const subscription = await Subscription.findById(req.body.subscriptionId)

  if ( ! subscription) {
    return res.status(422).json({message: 'The subscription was not found'})
  }

  const userRegistered = !! await User.count({email: req.body.email})

  if (userRegistered) {
    return res.status(409).json()
  }

  const user = new User(req.body)
  user.subscription = subscription.id

  try {
    const newUser = await user.save()
    await User.populate(newUser, {path: 'subscription'});

    res.status(201).json(newUser);
  } catch (errors) {
    res.status(422).json({message: errors.message})
  }
}

module.exports = signUp

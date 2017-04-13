'use strict'

require('../src/bootload')

const Subscription = require('../src/subscription/subscription')
const SubscriptionType = require('../src/subscription/SubscriptionType')
const mongoose = require('mongoose')

Subscription.remove({}, () => {});

let BasicSubscription = new Subscription({
  _id: SubscriptionType.BASIC,
  name: 'Basic',
  price: 29.99,
  config: {
    maxEvaluators: 3,
    maxEvaluatees: 30
  }
});

let PremiumSubscription = new Subscription({
  _id: SubscriptionType.PREMIUM,
  name: 'Premium',
  price: 59.99,
  config: {
    maxEvaluators: 10,
    maxEvaluatees: 100
  }
});

let EnterpriseSubscription = new Subscription({
  _id: SubscriptionType.ENTERPRISE,
  name: 'Enterprise',
  price: 149.99,
  config: {
    maxEvaluators: 100,
    maxEvaluatees: 10000
  }
});

Promise.all([
  BasicSubscription.save(),
  PremiumSubscription.save(),
  EnterpriseSubscription.save()
]).then(() => {
  mongoose.connection.close()
})

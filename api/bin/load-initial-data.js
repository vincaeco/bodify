'use strict'

require('../src/bootload');
let Subscription = require('../src/subscription/subscription');
const SubscriptionType = require('../src/subscription/SubscriptionType'),

Subscription.remove({}, () => {});

var BasicSubscription = new Subscription({
  _id: SubscriptionType.BASIC,
  name: 'Basic',
  price: 29.99,
  config: {
    maxEvaluators: 3,
    maxEvaluatees: 30
  }
});

BasicSubscription.save();

var PremiumSubscription = new Subscription({
  _id: SubscriptionType.PREMIUM,
  name: 'Premium',
  price: 59.99,
  config: {
    maxEvaluators: 10,
    maxEvaluatees: 100
  }
});

PremiumSubscription.save();

var EnterpriseSubscription = new Subscription({
  _id: SubscriptionType.ENTERPRISE,
  name: 'Enterprise',
  price: 149.99,
  config: {
    maxEvaluators: 100,
    maxEvaluatees: 10000
  }
});

EnterpriseSubscription.save();

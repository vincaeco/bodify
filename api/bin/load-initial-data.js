'use strict'

require('../src/bootload');
var Subscription = require('../src/subscription/subscription');

var BasicSubscription = new Subscription({
  name: 'Basic',
  price: 29.99,
  config: {
    maxEvaluators: 3,
    maxEvaluatees: 30
  }
});
BasicSubscription.save();

var PremiumSubscription = new Subscription({
  name: 'Premium',
  price: 59.99,
  config: {
    maxEvaluators: 10,
    maxEvaluatees: 100
  }
});
PremiumSubscription.save();

var EnterpriseSubscription = new Subscription({
  name: 'Enterprise',
  price: 149.99,
  config: {
    maxEvaluators: 100,
    maxEvaluatees: 10000
  }
});
EnterpriseSubscription.save();

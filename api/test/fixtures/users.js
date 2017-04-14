const SubscriptionType = require('../../src/subscription/SubscriptionType')

module.exports = [
  {
    'name': 'Luis Enrique',
    'email': 'luis@bodify.com',
    'password': 12345678,
    'subscriptionId': SubscriptionType.BASIC
  },
  {
    'name': 'Pep Guardiola',
    'email': 'pep@bodify.com',
    'password': 12345678,
    'subscriptionId': SubscriptionType.PREMIUM
  }
]

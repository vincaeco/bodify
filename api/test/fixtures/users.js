const SubscriptionType = require('../../src/subscription/SubscriptionType')
const generateEncryptedPassword = require('../../src/utils/generateEncryptedPassword')

module.exports = [
  {
    'name': 'Luis Enrique',
    'email': 'luis@bodify.com',
    'password': generateEncryptedPassword(12345678),
    'subscriptionId': SubscriptionType.BASIC
  },
  {
    'name': 'Pep Guardiola',
    'email': 'pep@bodify.com',
    'password': generateEncryptedPassword(12345678),
    'subscriptionId': SubscriptionType.PREMIUM
  }
]

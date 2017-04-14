require('../../bootload')
const chai = require('chai')
const app = require('../../../src/index')

const getSubscriptionList = () => {
  return chai.request(app)
        .get('/subscriptions')
}

module.exports = getSubscriptionList

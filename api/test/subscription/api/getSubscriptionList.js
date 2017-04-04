'use strict'

const chai = require('chai')

const getSubscriptionList = () => {
    return chai.request(API_URL)
        .get('/subscriptions');
}

module.exports = getSubscriptionList

'use strict'
require('../../bootload');

const chai = require('chai');

module.exports = () => {
    return chai.request(API_URL)
        .get('/subscriptions');
};

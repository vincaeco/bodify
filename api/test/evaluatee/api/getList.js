'use strict'

const chai = require('chai')

const getList = (token) => {
    return chai.request(API_URL)
        .get('/evaluatees')
        .set('Authorization', token);
}

module.exports = getList

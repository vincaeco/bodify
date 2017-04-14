'use strict'

const chai = require('chai')
const app = require('../../../src/index')

const getEvaluateeList = (token) => {
    return chai.request(app)
        .get('/evaluatees')
        .set('Authorization', token);
}

module.exports = getEvaluateeList

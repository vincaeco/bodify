'use strict'

const expect = require('chai').expect,
      registerEvaluatee = require('../api/registerEvaluatee')

const tryRegisterWithInvalidData = (
  testMessage,
  evaluatee
) => {
  it(testMessage, done => {
    registerEvaluatee(evaluatee, global.users['luis'].token)
      .end((error, response) => {
        expect(response).to.have.status(422)
        expect(response.body).to.have.property('error')

        done()
      })
  })
}

module.exports = tryRegisterWithInvalidData

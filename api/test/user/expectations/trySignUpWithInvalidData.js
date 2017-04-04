'use strict'

const expect = require('chai').expect,
      signUp = require('../api/signUp')

const trySignUpWithInvalidData = (testMessage, name, email, password, subscriptionId) => {
  it(testMessage, done => {
    signUp(name, email, password, subscriptionId)
      .end((error, response) => {
        expect(response).to.have.status(422)
        expect(response.body).to.have.property('message')

        done()
      })
  })
}

module.exports = trySignUpWithInvalidData

'use strict'

const expect = require('chai').expect,
      signUp = require('../api/signUp')

const trySignUpWithInvalidData = (testMessage, user) => {
  it(testMessage, done => {
    signUp(user)
      .end((error, response) => {
        expect(response).to.have.status(422)
        expect(response.body).to.have.property('error')

        done()
      })
  })
}

module.exports = trySignUpWithInvalidData

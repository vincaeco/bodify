'use strict'

const chai = require('chai'),
      generateToken = require('../api/generateToken'),
      expect = require('chai').expect

module.exports = (email, password) => {
  it('does not accept invalid data', (done) => {
    generateToken(email, password)
      .end((error, response) => {
        expect(response).to.have.status(422)
        expect(response.body).to.have.property('message')

        done()
      })
  })
}

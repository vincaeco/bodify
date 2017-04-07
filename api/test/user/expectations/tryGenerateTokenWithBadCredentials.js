'use strict'

const chai = require('chai'),
      generateToken = require('../api/generateToken'),
      expect = require('chai').expect

module.exports = (email, password) => {
  it('does not generate token with bad credentials', (done) => {
    generateToken(email, password)
      .end((error, response) => {
        expect(response).to.have.status(403)

        done()
      })
  })
}

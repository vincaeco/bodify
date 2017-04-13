'use strict'

const chai = require('chai'),
      generateToken = require('../api/generateToken'),
      expect = require('chai').expect

module.exports = (email, password) => {
  it("generates a valid token", done => {
    generateToken(email, password)
      .end((error, response) => {
        expect(response).to.have.status(200)
        expect(response.body).to.have.property('token')

        done()
      })
  })
};

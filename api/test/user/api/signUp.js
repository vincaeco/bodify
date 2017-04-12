'use strict'

const chai = require('chai')

const signUp = ({name, email, password, subscriptionId}) => {
  return chai.request(API_URL)
    .post('/sign-up')
    .send({
      name,
      email,
      password,
      subscriptionId
    })
}

module.exports = signUp

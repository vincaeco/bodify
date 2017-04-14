'use strict'

const chai = require('chai')
const app = require('../../../src/index')

const registerEvaluatee = (
  {
    name,
    email,
    phoneNumber,
    bornDate,
    gender,
    civilStatus,
    occupation
  },
  token
) => {
  return chai.request(app)
    .post('/evaluatees')
    .set('Authorization', token)
    .send({
      name,
      email,
      phoneNumber,
      bornDate,
      gender,
      civilStatus,
      occupation
    })
}

module.exports = registerEvaluatee

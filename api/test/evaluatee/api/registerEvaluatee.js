'use strict'

const chai = require('chai')

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
  return chai.request(API_URL)
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

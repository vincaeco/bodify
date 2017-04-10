'use strict'

const chai = require('chai')

const register = (
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
    .set('Authorization', `Bearer ${token}`)
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

module.exports = register

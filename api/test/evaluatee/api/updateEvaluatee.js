const chai = require('chai')
const app = require('../../../src/index')

const updateEvaluatee = (
  evaluateeId,
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
    .put('/evaluatees/' + evaluateeId)
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

module.exports = updateEvaluatee

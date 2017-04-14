const expect = require('chai').expect
const registerEvaluatee = require('../api/registerEvaluatee')

const tryRegisterWithInvalidData = (evaluatee, token) => {
  return new Promise((resolve, reject) => {
    registerEvaluatee(evaluatee, token)
      .end((_, response) => {
        expect(response).to.have.status(422)
        expect(response.body).to.have.property('error')

        resolve()
      })
  })
}

module.exports = tryRegisterWithInvalidData

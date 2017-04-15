const expect = require('chai').expect
const updateEvaluatee = require('../api/updateEvaluatee')
const Evaluatee = require('../../../src/evaluatee/Evaluatee')

const tryUpdateWithInvalidData = (evaluateeId, newEvaluateeData, token) => {
  return new Promise(async (resolve, reject) => {
    const oldEvaluatee = await Evaluatee.findOne({_id: evaluateeId})

    updateEvaluatee(evaluateeId, newEvaluateeData, token)
      .end(async (_, response) => {
        const newEvaluatee = await Evaluatee.findOne({_id: evaluateeId})
        expect(response).to.have.status(422)
        expect(response.body).to.have.property('error')

        expect(newEvaluatee).to.deep.equal(oldEvaluatee)

        resolve()
      })
  })
}

module.exports = tryUpdateWithInvalidData

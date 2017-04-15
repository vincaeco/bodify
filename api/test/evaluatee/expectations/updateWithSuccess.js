const expect = require('chai').expect
const updateEvaluatee = require('../api/updateEvaluatee')
const Evaluatee = require('../../../src/evaluatee/Evaluatee')

const updateWithSuccess = (evaluateeId, evaluateeData, token) => {
  return new Promise((resolve, reject) => {
    updateEvaluatee(evaluateeId, evaluateeData, token)
      .end(async (_, response) => {
        const newEvaluatee = await Evaluatee.findOne({_id: evaluateeId})

        const expectedSchema = {
          'type': 'object',
          'properties': {
            '_id': { 'type': 'string' },
            'name': { 'type': 'string' },
            'email': { 'type': 'string' },
            'phoneNumber': { 'type': 'string' },
            'bornDate': { 'type': ['string', 'null'] },
            'gender': { 'type': 'string' },
            'civilStatus': { 'type': 'string' },
            'occupation': { 'type': 'string' },
            'evaluator': { 'type': 'string' }
          },
          'required': ['_id', 'name', 'email', 'phoneNumber', 'bornDate', 'gender', 'civilStatus', 'occupation', 'evaluator']
        }

        expect(response).to.have.status(200)
        expect(response.body).to.be.jsonSchema(expectedSchema)

        for (const property in evaluateeData) {
          let expectedValue = evaluateeData[property]

          if (property === 'bornDate') {
            expectedValue = expectedValue ? new Date(expectedValue) : null
          }

          expect(newEvaluatee).to.have.property(property).to.eql(expectedValue)
        }

        resolve()
      })
  })
}

module.exports = updateWithSuccess

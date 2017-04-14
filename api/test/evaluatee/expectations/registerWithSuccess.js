const expect = require('chai').expect,
  registerEvaluatee = require('../api/registerEvaluatee')

const registerWithSuccess = (
  testMessage,
  evaluatee,
  token
) => {
  it(testMessage, done => {
    registerEvaluatee(evaluatee, token)
      .end((error, response) => {
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
            'evaluator': { 'type': 'string'}
          },
          'required': ['_id', 'name', 'email', 'phoneNumber', 'bornDate', 'gender', 'civilStatus', 'occupation', 'evaluator']
        }

        expect(response).to.have.status(201)
        expect(response.body).to.be.jsonSchema(expectedSchema)

        done()
      })
  })
}

module.exports = registerWithSuccess

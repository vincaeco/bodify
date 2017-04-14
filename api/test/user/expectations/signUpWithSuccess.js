const expect = require('chai').expect,
  signUp = require('../api/signUp')

const signUpWithSuccess = (
  testMessage,
  signUpData
) => {
  it(testMessage, done => {
    signUp(signUpData)
      .end((error, response) => {
        const expectedSchema = {
          'type': 'object',
          'properties': {
            '_id': { 'type': 'string' },
            'name': { 'type': 'string' },
            'email': { 'type': 'string' },
            'subscription': { 'type': 'object'}
          },
          'required': ['_id', 'name', 'email', 'subscription']
        }

        expect(response).to.have.status(201)
        expect(response.body).to.be.jsonSchema(expectedSchema)

        done()
      })
  })
}

module.exports = signUpWithSuccess

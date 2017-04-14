require('../../bootload')

const chai = require('chai')
const expect = require('chai').expect
const getEvaluateeList = require('./api/getEvaluateeList')

describe('[GET] /evaluatees', () => {
  it('requires a valid Authorization token', done => {
    getEvaluateeList('invalid')
      .end((error, response) => {
        expect(response).to.have.status(403)
        done()
      })
  })

  it('returns a evalutee list of logged user', done => {
    getEvaluateeList(global.users['luis'].token)
      .end((error, response) => {
        const expectedSchema = {
          'type': 'array',
          'items': {
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
        }

        expect(response).to.have.status(200)
        expect(response.body).to.be.jsonSchema(expectedSchema)

        response.body.forEach(evaluatee => {
          expect(evaluatee.evaluator).to.be.equal(global.users['luis']._id)
        })

        done()
      })
  })
})

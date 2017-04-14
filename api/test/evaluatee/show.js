require('../bootload')

const expect = require('chai').expect
const showEvaluatee = require('./api/showEvaluatee')
const getJWTToken = require('../../src/utils/getJWTToken')
const users = require('../fixtures/users')
const User = require('../../src/user/User')
const evaluatees = require('../fixtures/evaluatees')
const Evaluatee = require('../../src/evaluatee/Evaluatee')

describe('[GET] /evaluatees/:id', () => {
  let luisToken
  let evaluateeBelongingToLuis
  let evaluateeBelongingToPep

  beforeEach(async () => {
    let userLuis = new User(users[0])
    userLuis = await userLuis.save()

    luisToken = getJWTToken(userLuis)

    let userPep = new User(users[1])
    userPep = await userPep.save()

    evaluateeBelongingToLuis = new Evaluatee(evaluatees[0])
    evaluateeBelongingToLuis.evaluator = userLuis._id
    evaluateeBelongingToLuis = await evaluateeBelongingToLuis.save()

    evaluateeBelongingToPep = new Evaluatee(evaluatees[1])
    evaluateeBelongingToPep.evaluator = userPep._id
    evaluateeBelongingToPep = await evaluateeBelongingToPep.save()
  })

  afterEach(async () => {
    await User.remove({})
    await Evaluatee.remove({})
  })

  it('requires a valid Authorization token', done => {
    showEvaluatee(evaluateeBelongingToLuis._id, 'invalid')
      .end((_, response) => {
        expect(response).to.have.status(403)
        done()
      })
  })

  it('does not show an evaluatee not owned by the logged user', done => {
    showEvaluatee(evaluateeBelongingToPep._id, luisToken)
      .end((_, response) => {
        expect(response).to.have.status(404)

        done()
      })
  })

  it('shows the evaluatee', done => {
    showEvaluatee(evaluateeBelongingToLuis._id, luisToken)
      .end((_, response) => {
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

        done()
      })
  })
})

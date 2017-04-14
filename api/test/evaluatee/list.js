require('../bootload')

const expect = require('chai').expect
const getEvaluateeList = require('./api/getEvaluateeList')
const getJWTToken = require('../../src/utils/getJWTToken')
const users = require('../fixtures/users')
const User = require('../../src/user/User')
const evaluatees = require('../fixtures/evaluatees')
const Evaluatee = require('../../src/evaluatee/Evaluatee')

describe('[GET] /evaluatees', () => {
  let luisToken
  let newEvaluateesBelongingToLuisUser

  beforeEach(async () => {
    newEvaluateesBelongingToLuisUser = []
    const userLuisData = users[0]
    const userPepData = users[1]

    let userLuis = new User(userLuisData)
    const newUserLuis = await userLuis.save()

    luisToken = getJWTToken(newUserLuis)

    const userPep = new User(userPepData)
    const newUserPep = await userPep.save()

    for (var i = 0; i < 3; i++) {
      let evaluatee = new Evaluatee(evaluatees[i])
      let belongsToLuisUser = i <= 1
      evaluatee.evaluator = belongsToLuisUser ? newUserLuis._id : newUserPep._id
      let newEvaluatee = await evaluatee.save()

      if (belongsToLuisUser) {
        newEvaluateesBelongingToLuisUser.push(newEvaluatee._id.toString())
      }
    }
  })

  afterEach(async () => {
    await User.remove({})
    await Evaluatee.remove({})
  })

  it('requires a valid Authorization token', done => {
    getEvaluateeList('invalid')
      .end((_, response) => {
        expect(response).to.have.status(403)
        done()
      })
  })

  it('returns a evalutee list of logged user', done => {
    getEvaluateeList(luisToken)
      .end((_, response) => {
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
              'evaluator': { 'type': 'string' }
            },
            'required': ['_id', 'name', 'email', 'phoneNumber', 'bornDate', 'gender', 'civilStatus', 'occupation', 'evaluator']
          }
        }

        expect(response).to.have.status(200)
        expect(response.body).to.be.jsonSchema(expectedSchema)
        expect(response.body.length).to.be.equal(2)

        response.body.forEach(evaluatee => {
          expect(newEvaluateesBelongingToLuisUser).to.contains(evaluatee._id)
        })

        done()
      })
  })
})

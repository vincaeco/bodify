require('../bootload')

const expect = require('chai').expect
const removeEvaluatee = require('./api/removeEvaluatee')
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
    removeEvaluatee(evaluateeBelongingToLuis._id, 'invalid')
      .end((_, response) => {
        expect(response).to.have.status(403)
        done()
      })
  })

  it('does not remove an evaluatee not owned by the logged user', done => {
    removeEvaluatee(evaluateeBelongingToPep._id, luisToken)
      .end((_, response) => {
        expect(response).to.have.status(404)

        done()
      })
  })

  it('does not remove an evaluatee that does not exists', done => {
    removeEvaluatee('58f106aa25aed912f5f55bd9', luisToken)
      .end(async (_, response) => {
        expect(response).to.have.status(404)

        done()
      })
  })

  it('remove the evaluatee', done => {
    removeEvaluatee(evaluateeBelongingToLuis._id, luisToken)
      .end(async (_, response) => {
        const evaluatee = await Evaluatee.findOne({_id: evaluateeBelongingToLuis._id})

        expect(response).to.have.status(200)
        expect(evaluatee).to.be.equal(null)

        done()
      })
  })
})

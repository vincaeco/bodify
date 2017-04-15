require('../bootload')

const expect = require('chai').expect
const updateEvaluatee = require('./api/updateEvaluatee')
const tryUpdateWithInvalidData = require('./expectations/tryUpdateWithInvalidData')
const updateWithSuccess = require('./expectations/updateWithSuccess')
const evaluatees = require('../fixtures/evaluatees')
const User = require('../../src/user/User')
const Evaluatee = require('../../src/evaluatee/Evaluatee')
const users = require('../fixtures/users')
const getJWTToken = require('../../src/utils/getJWTToken')

describe('[PUT] /evaluatees/:evaluateeId', () => {
  let luisToken
  let evaluateeBelongingToLuis
  let evaluateeBelongingToPep
  const newData = {
    name: 'David Luis',
    email: 'david@bodify.com',
    phoneNumber: '(47) 9 8888-8888',
    bornDate: '1988-01-01',
    gender: 'M',
    civilStatus: 'married',
    occupation: 'Defender'
  }

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
    updateEvaluatee(evaluateeBelongingToLuis._id, newData, 'invalid')
      .end((_, response) => {
        expect(response).to.have.status(403)
        done()
      })
  })

  it('does not update an evaluatee not owned by the logged user', done => {
    updateEvaluatee(evaluateeBelongingToPep._id, newData, luisToken)
      .end((_, response) => {
        expect(response).to.have.status(404)

        done()
      })
  })

  it('does not update an evaluatee that does not exists', done => {
    updateEvaluatee('58f106aa25aed912f5f55bd9', newData, luisToken)
      .end(async (_, response) => {
        expect(response).to.have.status(404)

        done()
      })
  })

  it('does not accept blank name', done => {
    tryUpdateWithInvalidData(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {name: ''}),
      luisToken
    ).then(done)
  })

  it('does not accept invalid email', done => {
    tryUpdateWithInvalidData(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {email: 'invalid-email'}),
      luisToken
    ).then(done)
  })

  it('does not accept invalid born date', done => {
    tryUpdateWithInvalidData(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {bornDate: 'invalid-date'}),
      luisToken
    ).then(done)
  })

  it('does not accept future born date', done => {
    let bornDate = new Date()
    bornDate.setDate(bornDate.getDate() + 1)

    tryUpdateWithInvalidData(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {bornDate}),
      luisToken
    ).then(done)
  })

  it('does not accept blank gender', done => {
    tryUpdateWithInvalidData(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {gender: ''}),
      luisToken
    ).then(done)
  })

  it('does not accept invalid gender', done => {
    tryUpdateWithInvalidData(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {gender: 'X'}),
      luisToken
    ).then(done)
  })

  it('does not accept invalid civil status', done => {
    tryUpdateWithInvalidData(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {civilStatus: 'invalid'}),
      luisToken
    ).then(done)
  })

  it('register with success until if email is blank', done => {
    updateWithSuccess(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {email: ''}),
      luisToken
    ).then(done)
  })

  it('register with success until if phone number is blank', done => {
    updateWithSuccess(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {phoneNumber: ''}),
      luisToken
    ).then(done)
  })

  it('register with success until if born date is blank', done => {
    updateWithSuccess(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {bornDate: ''}),
      luisToken
    ).then(done)
  })

  it('register with success until if civil status is blank', done => {
    updateWithSuccess(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {civilStatus: ''}),
      luisToken
    ).then(done)
  })

  it('register with success until if occupation is blank', done => {
    updateWithSuccess(
      evaluateeBelongingToLuis._id,
      Object.assign({}, newData, {occupation: ''}),
      luisToken
    ).then(done)
  })

  it('register with success with all data filled', done => {
    updateWithSuccess(
      evaluateeBelongingToLuis._id,
      newData,
      luisToken
    ).then(done)
  })
})

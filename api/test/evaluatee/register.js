require('../bootload')

const expect = require('chai').expect
const registerEvaluatee = require('./api/registerEvaluatee')
const tryRegisterWithInvalidData = require('./expectat2ions/tryRegisterWithInvalidData')
const registerWithSuccess = require('./expectations/registerWithSuccess')
const evaluatees = require('../fixtures/evaluatees')
const User = require('../../src/user/User')
const Evaluatee = require('../../src/evaluatee/Evaluatee')
const users = require('../fixtures/users')
const getJWTToken = require('../../src/utils/getJWTToken')

describe('[POST] /evaluatees', () => {
  const evaluateeData = evaluatees[0]
  let token

  beforeEach(async () => {
    const userData = users[0]

    let user = new User(userData)
    user.subscription = userData.subscriptionId
    const newUser = await user.save()

    token = getJWTToken(newUser)
  })

  afterEach(async () => {
    await User.remove({})
    await Evaluatee.remove({})
  })

  it('requires a valid Authorization token', done => {
    registerEvaluatee(evaluateeData, 'invalid')
      .end((_, response) => {
        expect(response).to.have.status(403)
        done()
      })
  })

  it('does not accept blank name', done => {
    tryRegisterWithInvalidData(
      Object.assign({}, evaluateeData, {name: ''}),
      token
    ).then(done)
  })

  it('does not accept invalid email', done => {
    tryRegisterWithInvalidData(
      Object.assign({}, evaluateeData, {email: 'invalid-email'}),
      token
    ).then(done)
  })

  it('does not accept invalid born date', done => {
    tryRegisterWithInvalidData(
      Object.assign({}, evaluateeData, {bornDate: 'invalid-date'}),
      token
    ).then(done)
  })

  let bornDate = new Date()
  bornDate.setDate(bornDate.getDate() + 1)
  tryRegisterWithInvalidData(
    'does not accept future born date',
    Object.assign({}, evaluateeData, {bornDate}),
    token
  )

  tryRegisterWithInvalidData(
    'does not accept blank gender',
    Object.assign({}, evaluateeData, {gender: ''}),
    token
  )

  tryRegisterWithInvalidData(
    'does not accept invalid gender',
    Object.assign({}, evaluateeData, {gender: 'X'}),
    token
  )

  tryRegisterWithInvalidData(
    'does not accept invalid civil status',
    Object.assign({}, evaluateeData, {civilStatus: 'invalid'}),
    token
  )

  registerWithSuccess(
    'register with success until if email is blank',
    Object.assign({}, evaluateeData, {email: ''}),
    token
  )

  registerWithSuccess(
    'register with success until if phone number is blank',
    Object.assign({}, evaluateeData, {phoneNumber: ''}),
    token
  )

  registerWithSuccess(
    'register with success until if born date is blank',
    Object.assign({}, evaluateeData, {bornDate: ''}),
    token
  )

  registerWithSuccess(
    'register with success until if civil status is blank',
    Object.assign({}, evaluateeData, {civilStatus: ''}),
    token
  )

  registerWithSuccess(
    'register with success until if occupation is blank',
    Object.assign({}, evaluateeData, {occupation: ''}),
    token
  )

  registerWithSuccess(
    'register with success with all data filled',
    evaluateeData,
    token
  )
})

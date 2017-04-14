require('../bootload')

const expect = require('chai').expect
const registerEvaluatee = require('./api/registerEvaluatee')
const tryRegisterWithInvalidData = require('./expectations/tryRegisterWithInvalidData')
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

  it('does not accept future born date', done => {
    let bornDate = new Date()
    bornDate.setDate(bornDate.getDate() + 1)

    tryRegisterWithInvalidData(
      Object.assign({}, evaluateeData, {bornDate}),
      token
    ).then(done)
  })

  it('does not accept blank gender', done => {
    tryRegisterWithInvalidData(
      Object.assign({}, evaluateeData, {gender: ''}),
      token
    ).then(done)
  })

  it('does not accept invalid gender', done => {
    tryRegisterWithInvalidData(
      Object.assign({}, evaluateeData, {gender: 'X'}),
      token
    ).then(done)
  })

  it('does not accept invalid civil status', done => {
    tryRegisterWithInvalidData(
      Object.assign({}, evaluateeData, {civilStatus: 'invalid'}),
      token
    ).then(done)
  })

  it('register with success until if email is blank', done => {
    registerWithSuccess(
      Object.assign({}, evaluateeData, {email: ''}),
      token
    ).then(done)
  })

  it('register with success until if phone number is blank', done => {
    registerWithSuccess(
      Object.assign({}, evaluateeData, {phoneNumber: ''}),
      token
    ).then(done)
  })

  it('register with success until if born date is blank', done => {
    registerWithSuccess(
      Object.assign({}, evaluateeData, {bornDate: ''}),
      token
    ).then(done)
  })

  it('register with success until if civil status is blank', done => {
    registerWithSuccess(
      Object.assign({}, evaluateeData, {civilStatus: ''}),
      token
    ).then(done)
  })

  it('register with success until if occupation is blank', done => {
    registerWithSuccess(
      Object.assign({}, evaluateeData, {occupation: ''}),
      token
    ).then(done)
  })

  it('register with success with all data filled', done => {
    registerWithSuccess(
      evaluateeData,
      token
    ).then(done)
  })
})

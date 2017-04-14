require('../bootload')

const expect = require('chai').expect
const signUp = require('./api/signUp')
const SubscriptionType = require('../../src/subscription/SubscriptionType')
const trySignUpWithInvalidData = require('./expectations/trySignUpWithInvalidData')
const signUpWithSuccess = require('./expectations/signUpWithSuccess')
const User = require('../../src/user/User')

describe('[POST] /sign-up', () => {
  const userData = {
    name: 'Luis Enrique',
    email: 'luis@bodify.com',
    password: 12345678,
    subscriptionId: SubscriptionType.BASIC
  }

  after(async () => {
    await User.remove({})
  })

  trySignUpWithInvalidData(
    'does not accept blank name',
    Object.assign({}, userData, {name: ''})
  )

  trySignUpWithInvalidData(
    'does not accept blank email',
    Object.assign({}, userData, {email: ''})
  )

  trySignUpWithInvalidData(
    'does not accept invalid email',
    Object.assign({}, userData, {email: 'invalid-email'})
  )

  trySignUpWithInvalidData(
    'does not accept blank password',
    Object.assign({}, userData, {password: ''})
  )

  trySignUpWithInvalidData(
    'does not accept blank subscriptionId',
    Object.assign({}, userData, {subscriptionId: ''})
  )

  signUpWithSuccess(
    'sign up with success (luis@bodify.com)',
    userData
  )

  it('does not sign up a user twice', done => {
    signUp(userData)
      .end((_, response) => {
        expect(response).to.have.status(409)
        done()
      })
  })

  signUpWithSuccess(
    'sign up with success (pep@bodify.com)',
    {
      name: 'Pep Guardiola',
      email: 'pep@bodify.com',
      password: 12345678,
      subscriptionId: SubscriptionType.PREMIUM
    }
  )
})

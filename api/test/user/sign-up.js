'use strict'

require('../bootload')

const chai = require('chai'),
      expect = require('chai').expect,
      signUp = require('./api/signUp'),
      SubscriptionType = require('../../src/subscription/SubscriptionType'),
      trySignUpWithInvalidData = require('./expectations/trySignUpWithInvalidData'),
      signUpWithSuccess = require('./expectations/signUpWithSuccess'),
      userData = require('../fixtures/user'),
      User = require('../../src/user/User')

global.users = {}

describe('[POST] /sign-up', () => {
  // afterEach(() => {
  //   User.remove({})
  // })

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
    'sign up with success (luis+test@bodify.com)',
    userData,
    responseData => { global.users['luis'] = responseData }
  )

  it('does not sign up a user twice', done => {
    signUp(userData)
      .end((error, response) => {
        expect(response).to.have.status(409)
        done()
      })
  })

  signUpWithSuccess(
    'sign up with success (pep+test@bodify.com)',
    {
      name: 'Pep Guardiola',
      email: 'pep+test@bodify.com',
      password: 12345678,
      subscriptionId: SubscriptionType.PREMIUM
    },
    responseData => { global.users['pep'] = responseData }
  )
})

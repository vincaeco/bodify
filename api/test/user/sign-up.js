'use strict'

const chai = require('chai'),
      expect = require('chai').expect,
      signUp = require('./api/signUp'),
      SubscriptionType = require('../../src/subscription/SubscriptionType'),
      trySignUpWithInvalidData = require('./expectations/trySignUpWithInvalidData'),
      signUpWithSuccess = require('./expectations/signUpWithSuccess')

describe('[POST] /sign-up', () => {
  const validSignUpData = {
    name: 'Luis Henrique',
    email: 'luis+test@bodify.com',
    password: 12345678,
    subscriptionId: SubscriptionType.BASIC
  }

  trySignUpWithInvalidData(
    'does not accept blank name',
    Object.assign({}, validSignUpData, {name: ''})
  )

  trySignUpWithInvalidData(
    'does not accept blank email',
    Object.assign({}, validSignUpData, {email: ''})
  )

  trySignUpWithInvalidData(
    'does not accept invalid email',
    Object.assign({}, validSignUpData, {email: 'invalid-email'})
  )

  trySignUpWithInvalidData(
    'does not accept blank password',
    Object.assign({}, validSignUpData, {password: ''})
  )

  trySignUpWithInvalidData(
    'does not accept blank subscriptionId',
    Object.assign({}, validSignUpData, {subscriptionId: ''})
  )

  signUpWithSuccess(
    'sign up with success (luis+test@bodify.com)',
    validSignUpData,
    responseData => { global.users['luis'] = responseData }
  )

  it('does not sign up a user twice', done => {
    signUp(validSignUpData)
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

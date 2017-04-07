'use strict'

const chai = require('chai'),
      expect = require('chai').expect,
      signUp = require('./api/signUp'),
      SubscriptionType = require('../../src/subscription/SubscriptionType'),
      trySignUpWithInvalidData = require('./expectations/trySignUpWithInvalidData')

describe('[POST] /sign-up', () => {
  const validSignUpData = {
    name: 'Luis Henrique',
    email: 'test@bodify.com',
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
    'does not accept blank password',
    Object.assign({}, validSignUpData, {password: ''})
  )

  trySignUpWithInvalidData(
    'does not accept blank subscriptionId',
    Object.assign({}, validSignUpData, {subscriptionId: ''})
  )

  it('sign up with success', done => {
    signUp(validSignUpData.name, validSignUpData.email, validSignUpData.password, validSignUpData.subscriptionId)
      .end((error, response) => {
        const expectedSchema = {
          "type": "object",
          "properties": {
            "_id": { "type": "string" },
            "name": { "type": "string" },
            "email": { "type": "string" },
            "subscription": { "type": "object"},
          },
          "required": ["_id", "name", "email", "subscription"]
        }

        expect(response).to.have.status(201)
        expect(response.body).to.be.jsonSchema(expectedSchema)

        done()
      })
  })

  it('does not sign up a user twice', done => {
    signUp(validSignUpData.name, validSignUpData.email, validSignUpData.password, validSignUpData.subscriptionId)
      .end((error, response) => {
        expect(response).to.have.status(409);
        done();
      });
  });
})

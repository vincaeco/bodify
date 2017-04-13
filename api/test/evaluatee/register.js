'use strict'

require('../../bootload')

const chai = require('chai')
const expect = require('chai').expect
const registerEvaluatee = require('./api/registerEvaluatee')
const tryRegisterWithInvalidData = require('./expectations/tryRegisterWithInvalidData')
const registerWithSuccess = require('./expectations/registerWithSuccess')
const evaluateeData = require('../fixtures/evaluatee')

describe('[POST] /evaluatees', () => {
  it("requires a valid Authorization token", done => {
    registerEvaluatee(evaluateeData, 'invalid')
      .end((error, response) => {
        expect(response).to.have.status(403);
        done();
      });
  });

  tryRegisterWithInvalidData(
    'does not accept blank name',
    Object.assign({}, evaluateeData, {name: ''})
  )

  tryRegisterWithInvalidData(
    'does not accept invalid email',
    Object.assign({}, evaluateeData, {email: 'invalid-email'})
  )

  tryRegisterWithInvalidData(
    'does not accept invalid born date',
    Object.assign({}, evaluateeData, {bornDate: 'invalid-date'})
  )

  let bornDate = new Date()
  bornDate.setDate(bornDate.getDate() + 1)
  tryRegisterWithInvalidData(
    'does not accept future born date',
    Object.assign({}, evaluateeData, {bornDate})
  )

  tryRegisterWithInvalidData(
    'does not accept blank gender',
    Object.assign({}, evaluateeData, {gender: ''})
  )

  tryRegisterWithInvalidData(
    'does not accept invalid gender',
    Object.assign({}, evaluateeData, {gender: 'X'})
  )

  tryRegisterWithInvalidData(
    'does not accept invalid civil status',
    Object.assign({}, evaluateeData, {civilStatus: 'invalid'})
  )

  registerWithSuccess(
    'register with success until if email is blank',
    Object.assign({}, evaluateeData, {email: ''}),
    global.users['luis'].token
  )

  registerWithSuccess(
    'register with success until if phone number is blank',
    Object.assign({}, evaluateeData, {phoneNumber: ''}),
    global.users['luis'].token
  )

  registerWithSuccess(
    'register with success until if born date is blank',
    Object.assign({}, evaluateeData, {bornDate: ''}),
    global.users['luis'].token
  )

  registerWithSuccess(
    'register with success until if civil status is blank',
    Object.assign({}, evaluateeData, {civilStatus: ''}),
    global.users['pep'].token
  )

  registerWithSuccess(
    'register with success until if occupation is blank',
    Object.assign({}, evaluateeData, {occupation: ''}),
    global.users['pep'].token
  )

  registerWithSuccess(
    'register with success with all data filled',
    evaluateeData,
    global.users['pep'].token
  )
})

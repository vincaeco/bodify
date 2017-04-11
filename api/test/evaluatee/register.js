'use strict'

const chai = require('chai'),
      expect = require('chai').expect,
      register = require('./api/register'),
      tryRegisterWithInvalidData = require('./expectations/tryRegisterWithInvalidData'),
      registerWithSuccess = require('./expectations/registerWithSuccess')

describe('[POST] /evaluatees', () => {
  const validRegisterData = {
    name: 'Neymar Jr',
    email: 'neymar+test@bodify.com',
    phoneNumber: '(47) 9 9999-9999',
    bornDate: '1990-01-01',
    gender: 'M',
    civilStatus: 'single',
    occupation: 'Soccer Player'
  }

  it("requires a valid Authorization token", done => {
    register(validRegisterData, 'invalid')
      .end((error, response) => {
        expect(response).to.have.status(403);
        done();
      });
  });

  tryRegisterWithInvalidData(
    'does not accept blank name',
    Object.assign({}, validRegisterData, {name: ''})
  )

  tryRegisterWithInvalidData(
    'does not accept invalid email',
    Object.assign({}, validRegisterData, {email: 'invalid-email'})
  )

  tryRegisterWithInvalidData(
    'does not accept invalid born date',
    Object.assign({}, validRegisterData, {bornDate: 'invalid-date'})
  )

  let bornDate = new Date()
  bornDate.setDate(bornDate.getDate() + 1)
  tryRegisterWithInvalidData(
    'does not accept future born date',
    Object.assign({}, validRegisterData, {bornDate})
  )

  tryRegisterWithInvalidData(
    'does not accept blank gender',
    Object.assign({}, validRegisterData, {gender: ''})
  )

  tryRegisterWithInvalidData(
    'does not accept invalid gender',
    Object.assign({}, validRegisterData, {gender: 'X'})
  )

  tryRegisterWithInvalidData(
    'does not accept invalid civil status',
    Object.assign({}, validRegisterData, {civilStatus: 'invalid'})
  )

  registerWithSuccess(
    'register with success until if email is blank',
    Object.assign({}, validRegisterData, {email: ''})
  )

  registerWithSuccess(
    'register with success until if phone number is blank',
    Object.assign({}, validRegisterData, {phoneNumber: ''})
  )

  registerWithSuccess(
    'register with success until if born date is blank',
    Object.assign({}, validRegisterData, {bornDate: ''})
  )

  registerWithSuccess(
    'register with success until if civil status is blank',
    Object.assign({}, validRegisterData, {civilStatus: ''})
  )

  registerWithSuccess(
    'register with success until if occupation is blank',
    Object.assign({}, validRegisterData, {occupation: ''})
  )

  registerWithSuccess(
    'register with success with all data filled',
    validRegisterData
  )
})

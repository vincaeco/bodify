'use strict'

require('../bootload')

const tryGenerateTokenWithBadCredentials = require('./expectations/tryGenerateTokenWithBadCredentials')
const generateTokenWithSuccess = require('./expectations/generateTokenWithSuccess')
const tryGenerateTokenWithInvalidData = require('./expectations/tryGenerateTokenWithInvalidData')
const User = require('../../src/user/User')
const users = require('../fixtures/users')

describe('[POST] /generate-token', () => {
  const userData = users[0]

  before(async () => {
    try {
      const user = new User(userData)
      user.subscription = userData.subscriptionId
      await user.save()
    } catch (e) {
      console.log(e)
    }
  })

  after(async () => {
    await User.remove({})
  })

  tryGenerateTokenWithInvalidData()
  tryGenerateTokenWithInvalidData('aaa', '123')
  tryGenerateTokenWithInvalidData('test@bodify.com', '')
  tryGenerateTokenWithBadCredentials('test@bodify.com', '99999999')
  tryGenerateTokenWithBadCredentials('a@bodify.com', '12345678')

  generateTokenWithSuccess(userData.email, userData.password)
})

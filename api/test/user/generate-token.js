require('../bootload')

const tryGenerateTokenWithBadCredentials = require('./expectations/tryGenerateTokenWithBadCredentials')
const generateTokenWithSuccess = require('./expectations/generateTokenWithSuccess')
const tryGenerateTokenWithInvalidData = require('./expectations/tryGenerateTokenWithInvalidData')
const User = require('../../src/user/User')
const users = require('../fixtures/users')

describe('[POST] /generate-token', () => {
  const userData = users[0]

  beforeEach(async () => {
    const user = new User(userData)
    user.subscription = userData.subscriptionId
    await user.save()
  })

  afterEach(async () => {
    await User.remove({})
  })

  tryGenerateTokenWithInvalidData()
  tryGenerateTokenWithInvalidData('aaa', '123')
  tryGenerateTokenWithInvalidData('test@bodify.com', '')
  tryGenerateTokenWithBadCredentials('test@bodify.com', '99999999')
  tryGenerateTokenWithBadCredentials('a@bodify.com', '12345678')

  generateTokenWithSuccess(userData.email, 12345678)
})

'use strict'

const chai = require('chai'),
      tryGenerateTokenWithInvalidData = require('./expectations/tryGenerateTokenWithInvalidData'),
      tryGenerateTokenWithBadCredentials = require('./expectations/tryGenerateTokenWithBadCredentials'),
      generateToken = require('./expectations/generateToken')

describe("[POST] /generate-token", () => {
  tryGenerateTokenWithInvalidData('')
  tryGenerateTokenWithInvalidData('aaa', '123')

  tryGenerateTokenWithBadCredentials('test@bodify.com', '99999999')
  tryGenerateTokenWithBadCredentials('a@bodify.com', '12345678')

  generateToken(
    'test@bodify.com',
    '12345678',
    generatedToken => { global.token = generatedToken }
  )
});

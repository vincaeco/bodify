'use strict'

const chai = require('chai'),
      tryGenerateTokenWithBadCredentials = require('./expectations/tryGenerateTokenWithBadCredentials'),
      generateToken = require('./expectations/generateToken'),
      tryGenerateTokenWithInvalidData = require('./expectations/tryGenerateTokenWithInvalidData')

describe("[POST] /generate-token", () => {
  tryGenerateTokenWithInvalidData()
  tryGenerateTokenWithInvalidData('aaa', '123')
  tryGenerateTokenWithInvalidData('test@bodify.com', '')
  tryGenerateTokenWithBadCredentials('test@bodify.com', '99999999')
  tryGenerateTokenWithBadCredentials('a@bodify.com', '12345678')

  generateToken(
    'luis+test@bodify.com',
    '12345678',
    generatedToken => { global.users['luis'].token = generatedToken }
  )
});

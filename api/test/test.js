'use strict'

require('./bootload')

const chai = require('chai'),
      database = require('./database')

describe("Bodify tests", () => {
  before(() => database.truncateTestData())

  require('./subscription/list')

  require('./user/sign-up')
  // require('./user/generate-token')
});

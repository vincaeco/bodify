'use strict'

const User = require('../src/user/User');

module.exports = {
  truncateTestData: () => {
    return Promise.all([
      User.remove({}, () => {})
    ])
  }
}

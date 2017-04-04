'use strict'

module.exports = {
  truncateTestData: () => {
    let User = require('../src/user/user');

    return Promise.all([
      User.remove({}, () => {})
    ])
  }
}

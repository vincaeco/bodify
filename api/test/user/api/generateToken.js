'use strict'
require('../../bootload');

const chai = require('chai');
const app = require('../../../src/index')

module.exports = (email, password) => {
  return chai.request(app)
      .post('/generate-token')
      .send({
        email,
        password
      });
};

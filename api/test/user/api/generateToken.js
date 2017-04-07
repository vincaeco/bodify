'use strict'
require('../../bootload');

const chai = require('chai');

module.exports = (email, password) => {
  return chai.request(API_URL)
      .post('/generate-token')
      .send({
        email,
        password
      });
};

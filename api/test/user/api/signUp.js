const chai = require('chai')
const app = require('../../../src/index')

const signUp = ({name, email, password, subscriptionId}) => {
  return chai.request(app)
    .post('/sign-up')
    .send({
      name,
      email,
      password,
      subscriptionId
    })
}

module.exports = signUp

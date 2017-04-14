const generateToken = require('../api/generateToken')
const expect = require('chai').expect

module.exports = (email, password) => {
  it('generates a valid token', done => {
    generateToken(email, password)
      .end((_, response) => {
        expect(response).to.have.status(200)
        expect(response.body).to.have.property('token')

        done()
      })
  })
}

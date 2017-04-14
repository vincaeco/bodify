const generateToken = require('../api/generateToken')
const expect = require('chai').expect

module.exports = (email, password) => {
  it('does not generate token with bad credentials', (done) => {
    generateToken(email, password)
      .end((_, response) => {
        expect(response).to.have.status(403)

        done()
      })
  })
}

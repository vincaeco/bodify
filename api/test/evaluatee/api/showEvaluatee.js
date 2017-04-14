const chai = require('chai')
const app = require('../../../src/index')

const showEvaluatee = (evaluateeId, token) => {
  return chai.request(app)
        .get('/evaluatees/' + evaluateeId)
        .set('Authorization', token)
}

module.exports = showEvaluatee

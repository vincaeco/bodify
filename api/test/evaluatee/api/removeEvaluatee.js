const chai = require('chai')
const app = require('../../../src/index')

const removeEvaluatee = (evaluateeId, token) => {
  return chai.request(app)
        .delete('/evaluatees/' + evaluateeId)
        .set('Authorization', token)
}

module.exports = removeEvaluatee

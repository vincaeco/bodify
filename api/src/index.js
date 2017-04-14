require('./bootload')

const express = require('express')
const expressValidator = require('express-validator')
const app = express()
const bodyParser = require('body-parser')
const config = require('../config')
const tokenMiddleware = require('./middlewares/tokenMiddleware')
const doesEvaluateeBelongsToLoggedUserMiddleware = require('./middlewares/doesEvaluateeBelongsToLoggedUserMiddleware')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(expressValidator({
  customValidators: {
    lt: (param, attr) => param < attr
  }
}))

app.get('/subscriptions', require('./subscription/actions/list'))

app.post('/sign-up', require('./user/actions/signUp'))
app.post('/generate-token', require('./user/actions/generateToken'))

app.use(tokenMiddleware)

app.get('/evaluatees', require('./evaluatee/actions/list'))
app.get('/evaluatees/:evaluateeId', doesEvaluateeBelongsToLoggedUserMiddleware, require('./evaluatee/actions/show'))
app.post('/evaluatees', require('./evaluatee/actions/register'))

app.use((_, req, res, next) => {
  res.status(400).json({'message': 'Something went wrong'})
})

app.listen(config.server.port)

module.exports = app

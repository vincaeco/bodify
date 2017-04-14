require('./bootload')

const express = require('express')
const expressValidator = require('express-validator')
const app = express()
const bodyParser = require('body-parser')
const config = require('../config')

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

// Authentication required
app.use(require('./user/middlewares/requireAuthentication'))

app.get('/evaluatees', require('./evaluatee/actions/list'))
app.post('/evaluatees', require('./evaluatee/actions/register'))

app.use((err, req, res, next) => {
  res.status(400).json({'message': 'Something went wrong'})
})

app.listen(config.server.port)

module.exports = app

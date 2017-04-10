'use strict'

require('./bootload')

const express = require('express')
const expressValidator = require('express-validator')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(expressValidator([]));

app.get('/subscriptions', require('./subscription/actions/list'))

app.post('/sign-up', require('./user/actions/signUp'))
app.post('/generate-token', require('./user/actions/generateToken'))

// Authentication required
app.use(require('./user/middlewares/requireAuthentication'))

app.post('/evaluatees', require('./evaluatee/actions/register'))

app.use((err, req, res, next) => {
  res.status(400).json({'message': 'Something went wrong'})
})

app.listen(3000);

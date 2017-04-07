'use strict'

require('./bootload')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/subscriptions', require('./subscription/actions/list'))

app.post('/sign-up', require('./user/actions/signUp'))

app.use((err, req, res, next) => {
  res.status(400).json({'message': 'Something went wrong'})
})

app.listen(3000);

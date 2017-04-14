require('dotenv').config()
const mongoose = require('mongoose')
const config = require('../config/index')

mongoose.Promise = global.Promise
mongoose.connect(config.db.uri)

mongoose.connection.on('connected', function () {
  console.log('Database connection opened')
})

mongoose.connection.on('error', function (err) {
  console.log('Database connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
  console.log('Database disconnected')
})

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Database disconnected through app termination')
    process.exit(0)
  })
})

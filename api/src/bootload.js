'use strict';

require('dotenv').config()
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);

mongoose.connection.on('connected', function () {
  console.log('Database connection opened');
});

mongoose.connection.on('error',function (err) {
  console.log('Database connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Database disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Database disconnected through app termination');
    process.exit(0);
  });
});

'use strict'

const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      email => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email),
      'Invalid e-mail address'
    ]
  },
  password: {
    type: String,
    required: true
  },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  }
})

module.exports = mongoose.model('User', UserSchema);

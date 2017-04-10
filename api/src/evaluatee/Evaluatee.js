'use strict'

const mongoose = require('mongoose'),
      Schema = mongoose.Schema

require('mongoose-type-email')

const EvaluateeSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 125
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    maxLength: 75
  },
  phoneNumber: {
    type: String,
    maxLength: 75
  },
  bornDate: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: true
  },
  civilStatus: {
    type: String,
    enum: ['single', 'married', 'divorced', 'widowed']
  },
  occupation: {
    type: String,
    maxLength: 125
  }
})

module.exports = mongoose.model('Evaluatee', EvaluateeSchema)

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
    maxLength: 75,
    allowBlank: true
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
    enum: ['', 'single', 'married', 'divorced', 'widowed']
  },
  occupation: {
    type: String,
    maxLength: 125
  },
  evaluator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Evaluatee', EvaluateeSchema)

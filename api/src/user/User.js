const mongoose = require('mongoose'),
  Schema = mongoose.Schema

require('mongoose-type-email')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 125
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
    maxLength: 75
  },
  password: {
    type: String,
    required: true,
    maxLength: 330
  },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  }
})

module.exports = mongoose.model('User', UserSchema)

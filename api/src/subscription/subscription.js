'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  name: String,
  price: Number,
  config: {
    maxEvaluators: Number,
    maxEvaluatees: Number
  }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  features: [{ type: String }],
  isFree: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema); 
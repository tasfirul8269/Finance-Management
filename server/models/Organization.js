const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String }, // Cloudinary URL
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  address: { type: String },
  phone: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema); 
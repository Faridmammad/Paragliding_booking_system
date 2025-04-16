const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  dob: { type: Date, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  additionalInfo: { type: String },
  healthIssues: { type: String, enum: ['yes', 'no'], default: 'no' },
  healthDescription: { type: String },
  dates: [{ type: Date }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);

const mongoose = require('mongoose');

const associationSchema = new mongoose.Schema({
  associationId: {
    type: String,
    required: true,
    unique: true
  },
  associationName: {
    type: String,
    required: true,
    trim: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  associationType: {
    type: String,
    required: true
  },
  professionalField: String,
  establishedYear: String,
  memberCount: String,
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: String,
  website: String,
  address: String,
  presidentName: String,
  presidentEmail: String,
  presidentPhone: String,
  presidentPosition: {
    type: String,
    default: 'President'
  },
  membershipTypes: [String],
  activities: [String],
  subscriptionPlan: {
    type: String,
    default: 'free'
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Association', associationSchema);

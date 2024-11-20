const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: [true, 'Destination is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
  activities: {
    type: [String],
    default: [], 
  },
});

module.exports = mongoose.model('Plan', planSchema);

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const WeekSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  PhaseId: {
    type: Schema.Types.ObjectId, ref: 'Phase',
  },
  day: [{
    type: Schema.Types.ObjectId, ref: 'Day',
  }],
});

module.exports = model('Week', WeekSchema);

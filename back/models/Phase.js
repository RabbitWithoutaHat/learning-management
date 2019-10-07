const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const PhaseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  week: [{
    type: Schema.Types.ObjectId, ref: 'Week',
  }],
  
});

module.exports = model('Phase', PhaseSchema);

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    { type: Schema.Types.ObjectId, ref: 'User' },
  ],
});

module.exports = model('Group', GroupSchema);

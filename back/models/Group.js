const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = model('Group', GroupSchema);

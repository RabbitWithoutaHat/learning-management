const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const TestSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  googleFormsLink: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = model('Test', TestSchema);

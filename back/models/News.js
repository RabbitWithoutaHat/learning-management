const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const NewsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = model('News', NewsSchema);

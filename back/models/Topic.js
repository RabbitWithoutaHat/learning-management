const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const TopicSchema = new Schema({
  topicName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  video: {
    type: String,
    required: true,
  },
  group: [
    { type: Schema.Types.ObjectId, ref: 'Group' },
  ],
  phase: {
    type: String,
    required: false,
  },
  week: {
    type: String,
    required: false,
    default: false,
  },
  day: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
  comments: [
    {
      type: String,
      required: false,
      default: false,
    },
  ],
});

module.exports = model('Topic', TopicSchema);

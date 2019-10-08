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
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
  groupName: {
    type: String,
    required: false,
  },
  fileLink: {
    type: String,
    required: false,
  },
  fileName: {
    type: String,
    required: false,
  },
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
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  githubLink: {
    type: String,
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

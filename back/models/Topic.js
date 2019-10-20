const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const TopicSchema = new Schema({
  topicName: {
    type: String,
    required: true,
    default: 'Заполни меня!',
  },
  description: {
    type: String,
  },
  video: {
    type: String,
    required: true,
    default: 'https://www.youtube.com/watch?v=p32zBaP2GsY',
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
    default: 1,
  },
  day: {
    type: String,
    required: true,
    default: 1,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  githubLink: {
    type: String,
    required: false,
    default:
      'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
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

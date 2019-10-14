const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const DaySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weekId:{
    type:Schema.Types.ObjectId,ref:'Week',
    required:false,
  },
  description: {
    type: String,
  },
  video: {
    type: String,
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId, ref: 'Group',
  },
  // phase: {
  //   type: String,
  // },
  
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

module.exports = model('Day', DaySchema);

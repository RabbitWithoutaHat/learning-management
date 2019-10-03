const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  group: [
    { type: Schema.Types.ObjectId, ref: 'Group' },
  ],
  photo: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
    default: false,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

module.exports = model('User', UserSchema);

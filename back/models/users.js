const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  points: Number,
});

userSchema.statics.getByEmail = async function(email) {
  return this.find({ email });
};

userSchema.statics.getByUserName = async function(nickname) {
  return this.find({ nickname });
};

userSchema.statics.getPointsByUserName = async function(nickname) {
  return this.find({ nickname }, { points: 1 });
};

userSchema.statics.setPointsByUserName = async function(nickname) {
  return this.findOneAndUpdate({ nickname }, { $set: { points } });
};

module.exports = model('User', userSchema);

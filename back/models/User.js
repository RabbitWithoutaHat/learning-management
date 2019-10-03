const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  nickname: {
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

UserSchema.statics.getByEmail = async function (email) {
  return this.find({ email });
};

UserSchema.statics.getByUserName = async function (nickname) {
  return this.find({ nickname });
};

UserSchema.statics.getPointsByUserName = async function (nickname) {
  return this.find({ nickname }, { points: 1 });
};

UserSchema.statics.setPointsByUserName = async function (nickname) {
  return this.findOneAndUpdate({ nickname }, { $set: { points } });
};

module.exports = model('User', UserSchema);

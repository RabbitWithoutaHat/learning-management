const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const TokenSchema = new Schema({
  accessToken: {
    type: String,
    required: false,
  },
  refreshToken: {
    type: String,
    required: false,
  },
});

TokenSchema.statics.findOrCreate = async function(Tokens, callback) {
  const token = await this.find();
  if (token.length === 0) {
    await this.create({
      accessToken: Tokens.accessToken,
      refreshToken: Tokens.refreshToken,
    });
  } else {
    await this.updateOne(
      {},
      {
        $set: {
          accessToken: Tokens.accessToken,
          refreshToken: Tokens.refreshToken,
        },
      },
    );
  }
  console.log('------------------!!saveDB!!', token[0]);

  callback(null, token);
};

module.exports = model('Token', TokenSchema);

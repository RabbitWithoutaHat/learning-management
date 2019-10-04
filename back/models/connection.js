const path = require('path');
const mongoose = require('mongoose');

const config = require('../config/config.json')[process.env.NODE_ENV];

// const basename = path.basename(__filename);
// console.log(config.db)
mongoose.connect(config.db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose.connection;

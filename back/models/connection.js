const path = require('path');
const mongoose = require('mongoose');

const config = require('../config/config.json')[
  process.env.NODE_ENV || 'development'
];

mongoose
  .connect(config.db, {
    useUnifiedTopology: true,
    bindIpAll: true,
    // useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(err);
  });

module.exports = mongoose.connection;

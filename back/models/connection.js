const path = require('path');
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

// const basename = path.basename(__filename);

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose.connection;

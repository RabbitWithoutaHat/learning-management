const mongoose = require('mongoose');
const User = require('../models/users');

// Подключаем mongoose.
mongoose.connect('mongodb://localhost/mygame', {useNewUrlParser: true,useUnifiedTopology: true,});

const users = [
  {
    nickname: 'Oleg',
    email: 'oleglol@MediaList.ru',
    password: '111',
    points: 0,
  },
];

User.insertMany(users).then(() => {
  console.log(`Count of users: ${users.length}`);
  console.log('-------------------');
  mongoose.connection.close();
});

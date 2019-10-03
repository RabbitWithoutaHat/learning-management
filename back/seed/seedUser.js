const connection = require('../models/connection');

const User = require('../models/User');

const beaverId = '5d95f85bd93180d422d24895';
const bearId = '5d95fb0644533cdb91290e74';

const users = [
  {
    email: 'oleglol@MediaList.ru',
    nickname: 'Oleg',
    password: '111',
    group: beaverId,
    status: 'student',
    regDate: new Date(),
  },
  {
    email: 'shimunic@gmail.com',
    nickname: 'sham',
    password: '111',
    group: beaverId,
    status: 'student',
    regDate: new Date(),
  },
  {
    email: 'olga@olga.com',
    nickname: 'olga',
    password: 'olga',
    group: bearId,
    status: 'student',
    regDate: new Date(),
  },
];

User.insertMany(users).then(() => {
  console.log(`Count of users: ${users.length}`);
  console.log('-------------------');
  connection.close();
});

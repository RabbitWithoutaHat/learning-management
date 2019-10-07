const connection = require('../models/connection');

const Group = require('../models/Group');

const groups = [
  {
    name: 'Beaver',
  },
];

Group.insertMany(groups).then(() => {
  console.log(`Count of users: ${groups.length}`);
  console.log('-------------------');
  connection.close();
});

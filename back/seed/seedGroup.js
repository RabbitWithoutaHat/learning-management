const connection = require('../models/connection');

const Group = require('../models/Group');

const groups = [
  {
    name: 'Bears',
  },
];

Group.insertMany(groups).then(() => {
  console.log(`Count of users: ${groups.length}`);
  console.log('-------------------');
  connection.close();
});

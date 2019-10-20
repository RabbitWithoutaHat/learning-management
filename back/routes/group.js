const express = require('express');

const router = express.Router();

const Group = require('../models/Group');
const User = require('../models/User');

router.put('/', async (req, res, next) => {
  const { groups } = req.body;
  const newgroup = req.body.newGroup;

  // добавить логику изменения админа на обычного пользователя!!
  const groupId = await Group.findOne({ name: newgroup });
  for (let i = 0; i < groups.length; i++) {
    if (newgroup === 'admin') {
      await User.findOneAndUpdate(
        { _id: groups[i] },
        { groupName: newgroup, group: groupId._id, status: 'admin' },
      );
    } else {
      await User.findOneAndUpdate(
        { _id: groups[i] },
        { groupName: newgroup, group: groupId._id },
      );
    }
  }
  res.json({ status: 'done' });
});

router.post('/', async (req, res, next) => {
  const { groups } = req.body;
  const newgroup = req.body.newGroup;

  const group = new Group({
    name: newgroup,
  });
  await group.save();
  const groupId = await Group.findOne({ name: newgroup });
  for (let i = 0; i < groups.length; i++) {
    await User.findOneAndUpdate(
      { _id: groups[i] },
      { groupName: newgroup, group: groupId._id },
    );
  }
  res.json({ status: 'done' });
});

module.exports = router;

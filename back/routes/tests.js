const express = require('express');

const router = express.Router();
const Test = require('../models/Test');
const Group = require('../models/Group');

router.get('/', async (req, res) => {
  const tests = await Test.find();
  res.json(tests);
});

router.get('/:group', async (req, res) => {
  console.log('grouptet!!', req.params.group);

  const groupNames = [];
  let selectedGroupTests = [];
  if (req.params.group) {
    selectedGroupTests = await Test.find({ groupName: req.params.group });
  }
  if (
    req.params.group === 'undefined'
    || req.params.group === 'Все пользователи'
  ) {
    selectedGroupTests = await Test.find();
  }
  if (req.params.group === '') {
    selectedGroupTests = await Test.find({ groupName: '' });
  }
  const groupList = await Group.find();
  for (let i = 0; i < groupList.length; i++) {
    const obj = {
      key: `${i + 1}`,
      value: `${i + 1}`,
      text: groupList[i].name,
    };
    groupNames.push(obj);
    if (i === groupList.length - 1) {
      const allUser = {
        key: `${i + 2}`,
        value: `${i + 2}`,
        text: 'Все пользователи',
      };
      groupNames.push(allUser);
    }
  }
  res.json({ groupNames, selectedGroupTests });
});

// Edit test
router.put('/:id', async (req, res) => {
  let { googleFormsLink, title, id } = req.body;
  if (googleFormsLink.includes('https://docs.google.com/forms/d/e/')) {
    googleFormsLink = googleFormsLink.replace(
      'https://docs.google.com/forms/d/e/',
      '',
    );
  }
  if (googleFormsLink.includes('/viewform?usp=sf_link')) {
    googleFormsLink = googleFormsLink.replace('/viewform?usp=sf_link', '');
  }

  await Test.findOneAndUpdate(
    { googleFormsLink: id },
    {
      title,
      googleFormsLink,
    },
  );

  res.json({ status: 'done' });
});
router.post('/', async (req, res) => {
  const newTest = new Test({
    googleFormsLink: process.env.GFORMSLINK,
    groupName: req.body.group,
  });
  await newTest.save();
  res.json({ group: req.body.group });
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const Group = require('../models/Group');
const addMiddlewares = require('../middlewares/add-middlewares');
const News = require('../models/News');
const Topic = require('../models/Topic');
const Token = require('../models/Token');
const Test = require('../models/Test');

const router = express.Router();

addMiddlewares(router);

router.post('/login', async (req, res, next) => {
  const curUser = await User.findOne({ email: req.body.email });
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.json({ message: err, loading: true });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return res.json({ message: err, loading: true });
      }
      const userData = await User.findOne({ _id: req.user.id });
      return res.json({
        nickname: user.nickname,
        email: user.email,
        status: curUser.status,
        photo: userData.photo,
        group: userData.group,
        groupName: userData.groupName,
      });
    });
  })(req, res, next);
});
router.get('/logoout', (req, res) => {
  req.logout();
  res.json({ user: '' });
});

router.get('/auth-check', async (req, res) => {
  const {
 nickname, email, status, photo, group, groupName 
} = req.user;
  if (req.isAuthenticated()) {
    res.json({
      nickname,
      email,
      status,
      photo,
      group,
      groupName,
    });
  } else {
    res.json({
      message: 'You are not authenticated, please log-in or register',
    });
  }
});

router.post('/registration', async (req, res, next) => {
  const { nickname, email, password } = req.body;
  const curUser = await User.find({ email: req.body.email });
  if (curUser.length === 0) {
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      nickname,
      email,
      password: hash,
    });
    return passport.authenticate('local', async (err, user) => {
      const currentUser = await User.findOne({ email: req.body.email });
      if (err) {
        return res.json({ message: err, loading: true });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.json({ message: err, loading: true });
        }
        const {
 nickname, email, group, groupName 
} = currentUser;
        return res.json({
          nickname,
          email,
          status: 'user',
          photo: '',
          group,
          groupName,
        });
      });
    })(req, res, next);
  }
  return res.json({ message: 'This email is already used', loading: true });
});

// Add Phase
router.post('/phase', async (req, res) => {
  // Все топики для конкретной группы
  const topics = await Topic.find({ groupName: req.body.group });
  // Максимальное кол-во фаз !
  let phase = 0;
  let week = 0;
  if (topics.length !== 0) {
    for (let i = 0; i < topics.length; i++) {
      phase = Math.max(phase, topics[i].phase);
      week = Math.max(week, topics[i].week);
    }
  } else {
    phase = 1;
  }
  if (topics.length !== 0) {
    phase += 1;
  }
  const { group } = req.body;
  const newTopic = new Topic({
    groupName: group,
    phase: phase.toString(),
  });
  await newTopic.save();

  const updatedTopics = await Topic.find({ groupName: group });

  const result = [];
  for (let currPhase = 1; currPhase < phase + 1; currPhase++) {
    const phaseList = [];
    for (let currWeek = 1; currWeek < week + 1; currWeek++) {
      const week = updatedTopics
        .filter((el) => el.phase === `${currPhase}`)
        .filter((el) => el.week === `${currWeek}`)
        .sort((el) => (el.day ? -1 : 1));
      if (week.length === 0) {
        continue;
      } else {
        phaseList.push(week);
      }
    }
    result.push(phaseList);
  }

  res.json({ group: req.body.group });
});

// Add day
router.post('/day', async (req, res) => {
  const phase = req.body.phase + 1;
  const { group } = req.body;
  const { week } = req.body;
  const day = req.body.day + 1;
  const newTopic = new Topic({
    groupName: group,
    phase: phase.toString(),
    week,
    day,
  });
  await newTopic.save();
  res.json({ group });
});

// Add week
router.post('/week', async (req, res) => {
  const phase = req.body.phase + 1;
  const topics = await Topic.find({ phase, groupName: req.body.group });
  let Week = 0;
  if (topics.length !== 0) {
    for (let i = 0; i < topics.length; i++) {
      Week = Math.max(Week, topics[i].week);
    }
  } else {
    res.send({ status: 'hi' });
  }
  Week += 1;

  const newTopic = new Topic({
    groupName: req.body.group,
    phase: phase.toString(),
    week: Week,
  });
  await newTopic.save();
  res.json({ group: req.body.group });
});

// Get NEws from BD
router.get('/news', async (req, res) => {
  const news = await News.findOne();
  res.json({ news: news.name });
});

router.get('/last-topic', async (req, res, next) => {
  await User.findOneAndUpdate(
    { nickname: req.user.nickname },
    { group: req.user.group },
  );
  // Все топики
  const groups = await Group.find();
  const topics = await Topic.find({ groupName: groups[1].name });
  const mainPageTopic = topics.sort(
    (a, b) => b.phase - a.phase || b.week - a.week || b.day - a.day,
  );
  if (mainPageTopic.length === null) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json(mainPageTopic[0]);
});

router.get('/users/:group', async (req, res) => {
  const groupNames = [];
  let selectedGroupItems = [];
  if (
    req.params.group === 'undefined'
    || req.params.group === 'Все пользователи'
  ) {
    selectedGroupItems = await User.find();
  } else {
    selectedGroupItems = await User.find({ groupName: req.params.group });
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

  res.json({ groupNames, selectedGroupItems });
});

router.put('/avatar', async (req, res) => {
  const id = req.user._id;
  await User.updateOne({ _id: id }, { $set: { photo: req.files.photo.name } });

  try {
    if (!req.files.photo) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      const { photo } = req.files;
      photo.mv(`./public/images/${photo.name}`);

      // send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: photo.name,
          mimetype: photo.mimetype,
          size: photo.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/profile', async (req, res) => {
  let {
 email, password, nickname, phone, photo 
} = req.body;

  const { id } = req.user;
  photo = photo || req.user.photo;
  email = email || req.user.email;
  nickname = nickname || req.user.nickname;
  phone = phone || req.user.phone;
  let hash = req.user.password;
  if (password) {
    hash = await bcrypt.hash(password, 10);
  }
  await User.updateOne(
    { _id: id },
    {
      $set: {
        email,
        password: hash,
        nickname,
        phone,
      },
    },
  );
  const newData = await User.findOne({ _id: id });
  res.json({
    email: newData.email,
    nickname: newData.nickname,
    photo: newData.photo,
    phone: newData.phone,
    group: newData.group,
    groupName: newData.groupName,
  });
});

router.get('/token', async (req, res) => {
  const token = await Token.findOne({});
  res.json(token.accessToken);
});

module.exports = router;

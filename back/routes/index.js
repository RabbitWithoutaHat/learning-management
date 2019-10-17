// ЖЕСТЬ! ОЧЕНЬ МНОГО КОДА В ОДНОМ ФАЙЛЕ! 
// ТАКОЕ НАДО РАЗНОСИТЬ ПО РОУТАМ,
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
// НЕКОТОРЫЕ ИМПОРТЫ НЕ ИСПОЛЬЗУЮТСЯ, УДАЛИТЕ ИХ.
const fileUpload = require('express-fileupload');
const User = require('../models/User');
const Group = require('../models/Group');
const homePageWithNotification = require('../helpers/homePageWithNotification');
const notifications = require('../constants/notification-types');
const addMiddlewares = require('../middlewares/add-middlewares');
const { getUserNickname } = require('../helpers/reqHelpers');
const { bcrypt: saltRounds } = require('../constants/other-constants');
const News = require('../models/News');
const Topic = require('../models/Topic');
const Token = require('../models/Token');
const Test = require('../models/Test');

const router = express.Router();

addMiddlewares(router);

// Что такое лог? Логи пишет?
router.post('/log', async (req, res, next) => {
  // Какой еще userr?
  const userr = await User.findOne({ email: req.body.email });
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.json({ message: err, loading: true });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return res.json({ message: err, loading: true });
      }
      const userdata = await User.findOne({ _id: req.user.id });
      return res.json({
        user: user.nickname,
        email: user.email,
        status: userr.status,
        // userData
        photo: userdata.photo,
        group: userdata.group,
        groupName: userdata.groupName,
      });
    });
  })(req, res, next);
});

router.get(
  '/auth/google',
  passport.authenticate('google', { accessType: 'offline', prompt: 'consent' }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    res.redirect('/');
  },
);

// не пишите несколько слоов в одно в названии роута
router.get('/authcheck', async (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      // Деструктурируйте, страшно выглядит
      user: req.user.nickname,
      email: req.user.email,
      status: req.user.status,
      photo: req.user.photo,
      group: req.user.group,
      groupName: req.user.groupName,
    });
  } else {
    res.json({
      message: 'You are not authenticated, please log-in or register',
    });
  }
});
// Edit exactly Topic
// Если есть операции над topic значит надо писать по типу /topics/edit для get запросов
// И просто /topics для создания (post), /topics/id для put, delete.
router.post('/edittopic', async (req, res) => {
  console.log(req.body);

  const topic = await Topic.findOneAndUpdate(
    { _id: req.body.id },
    {
      // req.body слишком много раз
      githubLink: req.body.githubLink,
      video: req.body.youtubeLink,
      fileLink: req.body.fileLink,
      topicName: req.body.topic,
    },
  );

  res.json({ status: 'done' });
});
// Edit test
router.post('/edittest', async (req, res) => {
  let googleFormLink = req.body.googleFormsLink;
  if (googleFormLink.includes('https://docs.google.com/forms/d/e/')) {
    googleFormLink = googleFormLink.replace(
      'https://docs.google.com/forms/d/e/',
      '',
    );
  }
  if (googleFormLink.includes('/viewform?usp=sf_link')) {
    googleFormLink = googleFormLink.replace('/viewform?usp=sf_link', '');
  }
  await Test.findOneAndUpdate(
    { googleFormsLink: req.body.id },
    {
      title: req.body.title,
      googleFormsLink: googleFormLink,
    },
  );

  res.json({ status: 'done' });
});
// Add Phase
// POST на /phase/ и все
router.post('/addphase', async (req, res) => {
  // Все топики для конкретной группы
  const topics = await Topic.find({ groupName: req.body.group });
  // Что за консоль лог?)
  console.log('ooooooooooooooooooooooooooooooooooooooooooo', topics.length);
  // Максимальное кол-во фаз !
  // это классы? с большой буквы?
  let Phase = 0;
  let Week = 0;
  if (topics.length !== 0) {
    for (let i = 0; i < topics.length; i++) {
      Phase = Math.max(Phase, topics[i].phase);
      Week = Math.max(Week, topics[i].week);
    }
  } else {
    Phase = 1;
  }
  if (topics.length !== 0) {
    Phase += 1;
  }
  const { group } = req.body;
  const newTopic = new Topic({
    // значения по умолчанию можно задавать прям в настройка схемы монгуса
    topicName: 'Заполни меня!!!',
    description: 'стили',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    groupName: group,
    phase: Phase.toString(),
    week: 1,
    day: 1,
    githubLink:
      'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  });
  await newTopic.save();

  const updatedTopics = await Topic.find({ groupName: req.body.group });

  const result = [];
  // очень страшные именования p и w. Хочется читабельнее
  for (let p = 1; p < Phase + 1; p++) {
    const phase = [];
    for (let w = 1; w < Week + 1; w++) {
      const week = updatedTopics
      //  `${p}`, `${w}` - бессмыслица
        .filter((el) => el.phase === `${p}`)
        .filter((el) => el.week === `${w}`)
        .sort((el) => (el.day ? -1 : 1));
      if (week.length === 0) {
        continue;
      } else {
        phase.push(week);
      }
    }
    result.push(result);
  }

  res.json({ group: req.body.group });
});

// reg? регенерация, регистр, регулярные выражения? что это?
router.post('/reg', async (req, res, next) => {
  const { nickname, email, password } = req.body;
  const curUser = await User.find({ email: req.body.email });
  if (curUser.length === 0) {
    // 10 это не просто цифра. Это параметр шифрования, который надо вынести в конфиг и испортировать.
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      nickname,
      email,
      password: hash,
      // без группы
      // Что за хардкод?
      group: '5d9f1b73e7e77e0fa391d58d',
      groupName: 'Без группы',
    });
    return passport.authenticate('local', async (err, user) => {
      //this user?
      const thisUser = await User.findOne({ email: req.body.email });
      if (err) {
        return res.json({ message: err, loading: true });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.json({ message: err, loading: true });
        }
        console.log(thisUser);
        return res.json({
          user: thisUser.nickname,
          email: thisUser.email,
          status: 'user',
          photo: '',
          group: thisUser.group,
          groupName: thisUser.groupName,
        });
      });
    })(req, res, next);
  }
  return res.json({ message: 'This email is already used', loading: true });
});

// Get NEws from BD
// /news
router.get('/getnews', async (req, res) => {
  const news = await News.findOne();

  res.json({ news: news.name });
});
// Get TOpics from BD for users exact group!
router.post('/gettopics', async (req, res) => {
  
  const allGroups = await Group.find();
  // Последняя группа
  let selectedGroupName = '';
  if (req.body.selectedGroup) {
    selectedGroupName = req.body.selectedGroup;
  } else {
    // что за [1]?
    selectedGroupName = allGroups[1].name;
  }
  // Массив из имён всех групп
  const groupNames = [];
  for (let i = 0; i < allGroups.length; i++) {
    if (allGroups[i].name === 'Без группы' || allGroups[i].name === 'admin') {
      continue;
    } else {
      const obj = {
        key: `${i + 1}`,
        value: `${i + 1}`,
        text: allGroups[i].name,
      };
      groupNames.push(obj);
    }
  }
  // если нет групп вообще
  if (allGroups.length === 0) {
    const arr = [];
    // arr, arr?
    res.json({ arr, arr });
  }
  // Для админа составим топики последней группы,а для пользователя его группы
  let topics = [];
  if (req.user.status === 'admin') {
    // уберите логи
    console.log('admin');
    topics = await Topic.find({ groupName: selectedGroupName });
  } else {
    topics = await Topic.find({ groupName: req.user.groupName });
  }

  // Максимальное кол-во фаз и недель!
  let Phase = 0;
  let Week = 0;
  for (let i = 0; i < topics.length; i++) {
    Phase = Math.max(Phase, topics[i].phase);
    Week = Math.max(Week, topics[i].week);
  }
  const result = [];
  for (let p = 1; p < Phase + 1; p++) {
    const phase = [];
    for (let w = 1; w < Week + 1; w++) {
      const week = topics
        .filter((el) => el.phase === `${p}`)
        .filter((el) => el.week === `${w}`)
        .sort((el) => (el.day ? 1 : -1));
      if (week.length === 0) {
        continue;
      } else {
        phase.push(week);
      }
    }

    result.push(phase);
  }
  // Для админа верне топики последней группые ,все группы и поле конкретной группы для Select!
  // Для юзера вернем топики его группы
  if (req.user.status === 'admin') {
    res.json({
      result,
      topics,
      groupNames,
      selectedGroupName,
    });
  } else {
    res.json({ result, topics });
  }
});

// GET ALl Groups for lections page
router.get('/getgroups', (req, res) => {
  res.send({ status: 'hi' });
});

// Add day
router.post('/addday', async (req, res) => {
  const phase = req.body.phase + 1;
  const { group } = req.body;
  const { week } = req.body;
  const day = req.body.day + 1;
  const newTopic = new Topic({
    topicName: 'Заполни меня!!!',
    description: 'стили',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    groupName: group,
    phase: phase.toString(),
    week,
    day,
    githubLink:
      'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  });
  await newTopic.save();
  res.json({ group });
});

router.post('/addtest', async (req, res) => {
  const newTest = new Test({
    title: 'Заполни меня',
    googleFormsLink: '1FAIpQLSeiNk3uwPxYZvsA8WS16lNOeJQEf5MTdkKpu63yrAlIuZ3rEw',
    groupName: req.body.group,
    visible: false,
  });
  await newTest.save();
  res.json({ group: req.body.group });
});

// Add week
router.post('/addweek', async (req, res) => {
  const Phase = req.body.phase + 1;
  const topics = await Topic.find({ phase: Phase, groupName: req.body.group });
  // let Phase = 0;
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
    topicName: 'Заполни меня!!!',
    description: 'стили',
    video: 'https://www.youtube.com/watch?v=O2ulyJuvU3Q',
    groupName: req.body.group,
    phase: Phase.toString(),
    week: Week,
    day: 1,
    githubLink:
      'https://github.com/Elbrus-Bootcamp/phase-1/blob/master/week-1/2-tuesday.md',
    comments: [],
  });
  await newTopic.save();
  res.json({ group: req.body.group });
});

router.post('/changegroup', async (req, res, next) => {
  const { groups } = req.body;
  const newgroup = req.body.newGroup;

  // добавить логику изменения админа на обычного пользователя!!
  const groupId = await Group.findOne({ name: newgroup });
  for (let i = 0; i < groups.length; i++) {
    if (newgroup === 'admin') {
      // eslint тут ругается сильно!
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

router.post('/addnewgroup', async (req, res, next) => {
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

router.get('/getDayData', async (req, res, next) => {
  await User.findOneAndUpdate(
    { nickname: req.user.nickname },
    { group: req.user.group },
  );
  // Все топики
  const groups = await Group.find();
  const topics = await Topic.find({ groupName: groups[1].name });
  const mainPageTopic = topics
    .sort((a, b) => b.phase - a.phase || b.week - a.week || b.day - a.day);
  if (mainPageTopic.length === null) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json(mainPageTopic[0]);
});

router.get('/logoout', (req, res) => {
  req.logout();
  res.json({ user: '' });
});
router.post('/get-users', async (req, res) => {
  const groupNames = [];
  let selectedGroupItems = [];
  if (req.body.groupName) {
    selectedGroupItems = await User.find({ groupName: req.body.groupName });
  }
  if (!req.body.groupName || req.body.groupName === 'Все пользователи') {
    selectedGroupItems = await User.find();
  }
  if (req.body.groupName === '') {
    selectedGroupItems = await User.find({ groupName: '' });
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

router.post('/upload-avatar', async (req, res) => {
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

router.get('/get-tests', async (req, res) => {
  const tests = await Test.find();
  res.json(tests);
});

router.post('/get-tests', async (req, res) => {
  const groupNames = [];
  let selectedGroupTests = [];
  if (req.body.groupName) {
    selectedGroupTests = await Test.find({ groupName: req.body.groupName });
  }
  if (!req.body.groupName || req.body.groupName === 'Все пользователи') {
    selectedGroupTests = await Test.find();
  }
  if (req.body.groupName === '') {
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

router.post('/update-profile', async (req, res) => {
  let {
    email, password, nickname, phone, photo
  } = req.body;

  const { id } = req.user;

  let hash = req.user.password;
  // Эти проверки явно можно оптимизировать
  if (password) {
    hash = await bcrypt.hash(password, 10);
  }
  if (!photo) {
    photo = req.user.photo;
  }
  if (!email) {
    email = req.user.email;
  }
  if (!nickname) {
    nickname = req.user.nickname;
  }
  if (!phone) {
    phone = req.user.phone;
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
    login: newData.nickname,
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

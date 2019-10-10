const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
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

// GET login form
router.get('/login', (req, res) => {
  // console.log('Login GET');
  res.send('login');
});

// POST login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      // console.log('Login POST  auth ER 1');
      return res.render('login', { [notifications.error]: err });
    }
    req.logIn(user, (err) => {
      if (err) {
        // console.log('Login POST LOGIN ER 1');
        return res.render('login', { [notifications.error]: err });
      }
      // console.log('Login POST LOGIN True');
      return res.redirect(
        homePageWithNotification(notifications.message, 'You Logged In!'),
      );
    });
  })(req, res, next);
});

router.post('/log', async (req, res, next) => {
  const userr = await User.findOne({ email: req.body.email });
  // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',userdata);

  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.json({ message: err });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return res.json({ message: err });
      }
      // console.log("user statXXXXXXXXXXXXXXXXXXXXXushhfherh====", req.user);

      const userdata = await User.findOne({ _id: req.user.id });
      // console.log('user statXXXXXXXXXXXXXXXXXXXXXushhfherh====', userdata);
      return res.json({
        user: user.nickname,
        email: user.email,
        status: userr.status,
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

// GET registration form
router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.get('/authcheck', async (req, res) => {
  if (req.isAuthenticated()) {
    // console.log('aaaaaaaaaaa', req.user);

    res.json({
      user: req.user.nickname,
      email: req.user.email,
      status: req.user.status,
      photo: req.user.photo,
      group: req.user.group,
      groupName: req.user.groupName,
    });
  } else {
    console.log('aaaaaaaaaaa', req.user);
    res.json({
      message: 'You are not authenticated, please log-in or register',
    });
  }
});
// Edit exactly Topic
router.post('/edittopic', async (req, res) => {
  const topic = await Topic.findOneAndUpdate(
    { _id: req.body.id },
    {
      githubLink: req.body.githubLink,
      video: req.body.youtubeLink,
      fileLink: req.body.fileLink,
      topicName: req.body.topic,
    },
  );

  res.json({ status: 'done' });
});
// Add Phase
router.post('/addphase', async (req, res) => {
  // console.log('tyt', req.body);

  // req.user.groupName

  // const user = await User.findOneAndUpdate(
  //   { nickname: req.user.nickname },
  //   { group: '5d95f85bd93180d422d24895' },

  // console.log(user);
  // Все топики для конкретной группы
  const topics = await Topic.find({ groupName: req.body.group });
  // console.log('ooooooooooooooooooooooooooooooooooooooooooo', topics.length);
  // Максимальное кол-во фаз !
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
  Phase += 1;
  const { group } = req.body;
  // console.log('FAZA+LOGIN', Phase, group);

  const newTopic = new Topic({
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
  // console.log('ccccccccccccccccccccccccccccccccccccccccccccc', updatedTopics);

  const result = [];
  for (let p = 1; p < Phase + 1; p++) {
    const phase = [];
    for (let w = 1; w < Week + 1; w++) {
      const week = updatedTopics
        .filter((el) => el.phase === `${p}`)
        .filter((el) => el.week === `${w}`)
        .sort((el) => (el.day ? 1 : -1));
      if (week.length === 0) {
        continue;
      } else {
        phase.push(week);
      }
    }
    result.push(result);
  }

  // const topic = await Topic.findOneAndUpdate({ _id: req.body.id },{githubLink:req.body.githubLink,
  //   video:req.body.youtubeLink,fileLink:req.body.fileLink,topicName:req.body.topic });
  // res.json({ status: 'phase done' })
  res.json({ group: req.body.group });
});
// POST new user
router.post('/sign-up', async (req, res) => {
  const { nickname, email, password } = req.body;
  const curEmail = await User.getByEmail(email);
  if (curEmail.length === 0) {
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      nickname,
      email,
      password: hash,
    });
    return res.redirect(
      homePageWithNotification(
        notifications.message,
        'You Signed Up. Please Log In!',
      ),
    );
  }
  return res.render('sign-up', {
    [notifications.error]: 'This email is already used',
  });
});

router.post('/reg', async (req, res, next) => {
  const { nickname, email, password } = req.body;
  const curUser = await User.find({ email: req.body.email });
  if (curUser.length === 0) {
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      nickname,
      email,
      password: hash,
      // без группы
      group: '5d9f1b73e7e77e0fa391d58d',
      groupName: 'Без группы',
    });
    return passport.authenticate('local', async (err, user) => {
      const thisUser = await User.findOne({ email: req.body.email });
      if (err) {
        return res.json({ message: err });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.json({ message: err });
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
  return res.json({ message: 'This email is already used' });
});

// Get NEws from BD
router.get('/getnews', async (req, res) => {
  const news = await News.findOne();
  // console.log('BACKKK', news.name);

  res.json({ news: news.name });
});
// Get TOpics from BD for users exact group!
router.post('/gettopics', async (req, res) => {
  // Добавляю хардкодом группу т.к при реге её нет
  // console.log(req.user);
  // Все группы
  // console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm?!?', req.body.selectedGroup);

  const allGroups = await Group.find();
  // Последняя группа
  let selectedGroupName = '';
  if (req.body.selectedGroup) {
    selectedGroupName = req.body.selectedGroup;
  } else {
    // console.log('НЕТ В БАДИ');
    selectedGroupName = allGroups[allGroups.length - 1].name;
  }
  // let selectedGroupName = allGroups[allGroups.length-1].name;
  // console.log('selectedGroupName====', selectedGroupName);

  // Массив из имён всех групп
  const groupNames = [];
  for (let i = 0; i < allGroups.length; i++) {
    const obj = { key: `${i + 1}`, value: `${i + 1}`, text: allGroups[i].name };
    groupNames.push(obj);
  }
  // если нет групп вообще
  if (allGroups.length === 0) {
    const arr = [];
    res.json({ arr, arr });
  }
  // Для админа составим топики последней группы,а для пользователя его группы
  let topics = [];
  if (req.user.status === 'admin') {
    console.log('admin');
    topics = await Topic.find({ groupName: selectedGroupName });
    console.log('topic.length===', topics.length);
    console.log('ТОПИКИ ГРУППЫ ', topics[0].groupName);
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
    console.log(
      '888888888888888888888888888888888888888888888888',
      groupNames,
      selectedGroupName,
    );
  } else {
    // console.log('WTFFFFFFFFFFFFFFFFFFFFFFFFFFFF?!?');

    res.json({ result, topics });
  }
});

// GET ALl Groups for lections page
router.get('/getgroups', (req, res) => {
  res.send({ status: 'hi' });
});

// Add day
router.post('/addday', async (req, res) => {
  // console.log('addday!!!!!!!!!!!!!!!!!!!!!!!!!1',req.body);
  const phase = req.body.phase + 1;
  const {group} = req.body;
  const {week} = req.body;
  const day = req.body.day + 1;
  // console.log(phase,group,week,day);
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

// Add week
router.post('/addweek', async (req, res) => {
  console.log('группа', req.body.group);
  const Phase = req.body.phase + 1;
  const topics = await Topic.find({ phase: Phase, groupName: req.body.group });
  // console.log('TOPIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIC',topics);

  // let Phase = 0;
  let Week = 0;
  if (topics.length !== 0) {
    for (let i = 0; i < topics.length; i++) {
      // Phase = Math.max(Phase, topics[i].phase);
      Week = Math.max(Week, topics[i].week);
    }
  } else {
    res.send({ status: 'hi' });
  }
  // console.log('GROUP!!', req.body.group);
  Week += 1;
  console.log('Weeekkkkkkkkkkkkkkkkkkkk', Week);

  // phase = req.body.phase+1;
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
  // console.log(req.body);

  res.json({ group: req.body.group });
});
// Download File тестовая ручка.Не стрирайте.
router.get('/downloadtest', (req, res, next) => {
  const filePath =    '/home/oleg-lasttry/Final Project/learning-management/back/public/images/...'; // Or format the path using the `id` rest param

  const fileName = 'lenin.svg'; // The default name the browser will use

  // res.download(filePath, fileName);
  res.json({ message: 'Something good happened' });
  // res.json({user:"hi"})
});
router.post('/download', (req, res, next) => {
  res.download(
    '/home/oleg-lasttry/FinalProject/learning-management/back/public/com.svg',
  );
  // res.sendFile('/home/oleg-lasttry/FinalProject/learning-management/back/public/com.svg');
});

router.get('/getDayData', async (req, res, next) => {
  // Добавляю хардкодом группу т.к при реге её нет
  const user = await User.findOneAndUpdate(
    { nickname: req.user.nickname },
    { group: '5d9da4b6d895365403c3d4cc' },
  );

  // 5d9ce8472a0cbe13a7048fea
  // Все топики
  const topics = await Topic.find({ group: user.group });
  // console.log('ETI TOPIKI!', topics);
  const mainPageTopic = topics
    // .sort((el) => (el.phase) ? 1 : -1)
    .sort((a, b) => b.phase - a.phase || b.week - a.week || b.day - a.day);
  if (mainPageTopic.length === null) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json(mainPageTopic[0]);
});
// Upload some File
router.post('/upload', async (req, res) => {
  // const data = await JSON.parse(req.body);
  // console.log(data);

  // console.log(req.files);

  if (req.files === null) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const { file } = req.files;

  file.mv(
    `/home/oleg-lasttry/Final Project/learning-management/front/public/img/${file.name}`,
    (err) => {
      if (err) {
        console.log(err);
        // return res.status(500).send(err);
      }
      res.json({ fileName: file.name, filePath: `/img/${file.name}` });
    },
  );
  console.log('Upload');
});
// GET user log out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(
    homePageWithNotification(notifications.message, 'You logged out!'),
  );
});
router.get('/logoout', (req, res) => {
  req.logout();
  console.log('LOGOUT get');
  res.json({ user: '' });
});
// GET home page
router.get('/', (req, res) => {
  console.log('GET HOME PAGE');
  res.send('ok');
});
// GET Page with Authentication
router.get('/auth-page', async (req, res) => {
  if (req.isAuthenticated()) {
    console.log('Esli AUTH-PAGE TRUE');
    console.log('THis user data = ', req.user);

    res.render('auth-page', { currentUser: getUserNickname(req) });
  } else {
    console.log('Esli AUTH-PAGE NOT NOT TRUE!');
    res.redirect(
      homePageWithNotification(notifications.error, 'Not Authenticated!'),
    );
  }
});

router.post('/get-users', async (req, res) => {
  console.log(req.body.groupName);

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
    console.log('without group', selectedGroupItems);
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

router.get('/get-users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/get-tests', async (req, res) => {
  const tests = await Test.find();
  res.json(tests);
});

router.post('/update-profile', async (req, res) => {
  let {
 email, password, nickname, phone, photo 
} = req.body;

  const { id } = req.user;

  let hash = req.user.password;
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

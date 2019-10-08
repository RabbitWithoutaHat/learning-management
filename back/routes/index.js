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
const fs = require("fs");
const router = express.Router();

addMiddlewares(router);

// GET login form
router.get('/login', (req, res) => {
  console.log('Login GET');
  res.render('login');
});

// POST login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      console.log('Login POST  auth ER 1');
      return res.render('login', { [notifications.error]: err });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log('Login POST LOGIN ER 1');
        return res.render('login', { [notifications.error]: err });
      }
      console.log('Login POST LOGIN True');
      return res.redirect(
        homePageWithNotification(notifications.message, 'You Logged In!'),
      );
    });
  })(req, res, next);
});

router.post('/log', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.json({ message: err });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.json({ message: err });
      }
      return res.json({ user: user.nickname, email: user.email });
    });
  })(req, res, next);
});

// GET registration form
router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.get('/authcheck', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user.nickname });
  } else {
    res.json({
      message: 'You are not authinticated,please log-in or register',
    });
  }
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
        console.log(thisUser.nickname);

        return res.json({ user: thisUser.nickname });
      });
    })(req, res, next);
  }
  return res.json({ message: 'This email is already used' });
});

// Get NEws from BD
router.get('/getnews', async (req, res) => {
  const news = await News.findOne();
  console.log('BACKKK', news.name);

  res.json({ news: news.name });
});
// Get TOpics from BD for users exact group!
router.get('/gettopics', async (req, res) => {
  // Добавляю хардкодом группу т.к при реге её нет
  const user = await User.findOneAndUpdate(
    { nickname: req.user.nickname },
    { group: '5d95f85bd93180d422d24895' },
  );

  // Все топики
  const topics = await Topic.find({ group: user.group })
  console.log(topics.length);

  //Максимальное кол-во фаз и недель!
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
  // На всякий пожарный структура для плана "B"
  console.log(result);
  res.json({ result, topics });
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
  console.log('xxxxx', req.body);

  file.mv(
    `/home/oleg-lasttry/Final Project/learning-management/front/public/img/${file.name}`,
    (err) => {
      if (err) {
        console.log(err);
        // return res.status(500).send(err);
      }
      // res.json({fileName:file.name, filePath : `/img/${file.name}`})
    },
  );
});
router.get('/getDayData', async (req, res, next) => {
  // Добавляю хардкодом группу т.к при реге её нет
  console.log("here");
  
  const user = await User.findOneAndUpdate(
    { nickname: req.user.nickname },
    { group: '5d95f85bd93180d422d24895' },
  );
  // Все топики
  const topics = await Topic.find({ group: user.group });

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

  console.log(req.files);

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
// router.get('/', async (req, res) => {
//   const { error, message } = req.query;
//   console.log('GET HOME PAGE');
//   res.render('index', {
//     title: 'Home',
//     currentUser: getUserNickname(req),
//     error,
//     message,
//   });
// });
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
  console.log(req.user);
  console.log(req.user.groupName);

  res.json({
    email: req.user.email,
    login: req.user.nickname,
    photo: req.user.photo,
    phone: req.user.phone,
    group: req.user.group,
    groupName: req.user.groupName,
  });
});

module.exports = router;

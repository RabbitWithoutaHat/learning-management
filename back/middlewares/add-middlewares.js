const express = require('express');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
// Usage of FileStore leads to problem of not login in from the first time?
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcrypt');
const User = require('../models/User');

const config = require('../config/config.json')[process.env.NODE_ENV];

function addMiddlewares(router) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const foundUsers = await User.getByEmail(email);
        if (foundUsers.length === 0) {
          return done('Error. Email not found!');
        }
        const isPasswordCorrect = await bcrypt.compare(
          password,
          foundUsers[0].password,
        );
        if (isPasswordCorrect) {
          const user = {
            id: foundUsers[0].id,
            nickname: foundUsers[0].nickname,
            email: foundUsers[0].email,
          };
          return done(null, user);
        }
        return done('Error. Password not correct!');
      },
    ),
  );

  router.use(express.urlencoded({ extended: false })); // Form data

  router.use(express.json()); // JSON

  router.use(
    session({
      store: new MongoStore({
        url: config.db,
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default
      }),
      secret: 'rotating beaver',
      resave: false,
      saveUninitialized: true,
    }),
  );

  // router.use(
  //   session({
  //     store: new FileStore(),
  //     secret: 'keyboard cat',
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: { maxAge: 60 * 60 * 1000 },
  //   }),
  // );

  router.use(passport.initialize());

  router.use(passport.session());

  // tell passport how to serialize the user
  passport.serializeUser((user, done) => {
    console.log('serializeUser: user:', user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser: id:', id);
    const user = await User.findById(id);
    done(null, user);
  });
}

module.exports = addMiddlewares;

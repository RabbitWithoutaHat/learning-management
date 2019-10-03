const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
// Usage of FileStore leads to problem of not login in from the first time?
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt');
const connection = require('../models/connection');
const User = require('../models/User');

function addMiddlewares(router) {
  // configure passport.js to use the local strategy
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
      store: new FileStore(),
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60 * 60 * 1000 },
    }),
  );

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

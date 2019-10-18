const express = require('express');

const router = express.Router();
const passport = require('passport');

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

module.exports = router;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const newToken = require('./helpers/googleTokens');
const connection = require('./models/connection');

const indexRouter = require('./routes/index');
const Token = require('./models/Token');

const app = express();
const port = 5002;

// setTimeout(newToken, 15000);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '25492420798-qjo4b8c9nj7p3hibsocb6raf5m91443t.apps.googleusercontent.com',
      clientSecret: 'J20xLC9i0yNPGwjHSXk54UcO',
      callbackURL: 'http://localhost:5002/auth/google/callback',
      scope: ['profile', 'https://www.googleapis.com/auth/calendar.readonly'],
    },
    (accessToken, refreshToken, profile, done) => {
      Token.findOrCreate({ accessToken, refreshToken }, (err, data) => done(err, data),);
    },
  ),
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

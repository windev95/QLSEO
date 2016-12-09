var express = require('express');
var path = require('path');
var pool =  require('pg');
var flash = require('express-flash');
var favicon = require('serve-favicon');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var check = require ('./routes/check');
var checkkq = require ('./routes/checkkq');
// var check = require ('./routes/check/view');
var news = require ('./routes/news');
// var Users = require('./models').Users;

var app = express();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:qtoan2012@localhost:5432/QLSEO');
var Users = sequelize.define('Users', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  namee: {
    type: Sequelize.STRING
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// authetication setup


passport.serializeUser(function(Users, done) {
  done(null, Users.id);
});

passport.deserializeUser(function(id, done) {
  Users.findOne(id).success(function(Users) { done(null, Users); });
});
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, done) {

    Users.find({ where: { email : email } }).then(function (Users) {
      if (!Users) {
        return done(null, false, { message: 'Incorrect email address.' });
      }
      if (!Users.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, Users);
    });
  }
));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret : "secret",
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/register', register);
app.use('/login', login);
app.use('/check', check);
app.use('/checkkq', checkkq);
// app.use('/check/view', check);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;

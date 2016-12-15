var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Users = require('../models/users').Users;
var passport = require('passport');
var ejs = require('ejs');
var flash = require('connect-flash');
var multer = require('multer');
var form = multer();
var LocalStrategy = require('passport-local').Strategy;
var app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var sess;
app.get('/', function(req, res, next) {
  sess = req.session;
  res.render('login', { 'title': 'Đăng nhập' });
});

passport.use(new LocalStrategy(
    {
      emailField: 'email',
      passwordField: 'password'
    },
  function(email, password, done) {    
    Users.findOne({ email: email }, function(err, Users) {
      if (err) { return done(err); }
      if (!Users) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (Users.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, Users);
    });
  }
));

app.post('/', form.single() ,urlencodedParser, function (req, res, done) {
  sess = req.session;
  if (!req.body.email) return res.sendStatus(400)
  if (!req.body.password) return res.sendStatus(400)
  var email = req.body.email;
  var password = req.body.password;
    Users.findOne({ where: { email : email } }).then(function (Users) {
      if (!Users) {
        return res.redirect('/login');
      }
      if (Users.password !== password) {
        return res.redirect('/login');        
      }
      return res.redirect('/check');
    });
   });

module.exports = app;

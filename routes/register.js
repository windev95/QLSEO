var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Users = require('../models/users').Users;
var multer = require('multer');
var ejs = require('ejs');
var form = multer();
var app = express();

/* GET home page. */

app.get('/', function(req, res, next) {
  res.render('register', { title: 'Đăng ký', error: "" } );
});

app.post('/', form.single() ,urlencodedParser, function (req, res) {
  if (!req.body.namee) return res.sendStatus(400)
  if (!req.body.email) return res.sendStatus(400)
  if (!req.body.password) return res.sendStatus(400)
  var email = req.body.email;
  var password = req.body.password;
    Users.findOne({ where: { email : email } }).then(function (Users) {
      if (Users) {
        return res.redirect('/register');
      }
    });
  Users
    .findOrCreate({where: {email: req.body.email},defaults: {namee: req.body.namee, password: req.body.password}})
    .spread(function(Users, created) {
      console.log(Users.get({
        plain: true
      }))
      console.log(created)
      return res.redirect('/login');
      })
   });
module.exports = app;

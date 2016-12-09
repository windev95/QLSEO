var express = require('express');
var session = require('express-session');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var assert = require('assert')
var google = require('google')
var multer = require('multer');
var form = multer();
var pg = require('pg');
var sequelize = new Sequelize('postgres://postgres:qtoan2012@localhost:5432/QLSEO');
var app = express();
var bcrypt = require('bcrypt-nodejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var util = require('util');
var gr = require('google-ranking');
var searchrank = require('google-search-rank');
var S = require('string');
app.get('/', function(req, res, next) {
  res.render('check', { title: 'Kiểm tra từ khóa' });
});

app.post('/', form.single() ,urlencodedParser, function (req, ress){
});

module.exports = app;
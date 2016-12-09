var express = require('express');
var app = express();
var util = require('util');

/* GET home page. */
app.get('/', function(req, res, next) {

  res.render('news', { title: 'Tin tức' });
});

module.exports = app;

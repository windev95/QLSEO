var express = require('express');
var app = express();
var util = require('util');
var gr = require('google-ranking');
var searchrank = require('google-search-rank');
var google = require('google')
google.resultsPerPage = 25
var nextCounter = 0

/* GET home page. */
app.get('/', function(req, res, next) {

  res.render('news', { title: 'Tin tức' });
});

module.exports = app;

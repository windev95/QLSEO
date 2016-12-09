var express = require('express');
var pg = require('pg');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:20121995@localhost:5432/QLSEO');
var bcrypt = require('bcrypt-nodejs');
var app = express();

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
},{
    timestamps: false
});

module.exports.Users = Users;

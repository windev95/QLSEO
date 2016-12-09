"use strict";

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("User", {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      namee: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate : function(users, options, next) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(users.password, salt, function(err, hash) {
            users.password = hash;
            next(null, user);
          });
        });
      }
    },

    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return Users;
};

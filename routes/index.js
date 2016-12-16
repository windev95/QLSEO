var express = require('express');
var session = require('express-session');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
 var user = null;
  res.render('index', { title: 'Trang chủ' });
});
module.exports = router;

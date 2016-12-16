var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var google = require('google');
var multer = require('multer');
var form = multer();
var app = express();
var S = require('string');

google.resultsPerPage = 25
var nextCounter = 0
google.lang = 'vn'
google.tld = 'com.vn'
// google.nextText = 'Weiter'

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('check', { title: 'Kiểm tra từ khóa' });
});

app.post('/', form.single() ,urlencodedParser, function (req, ress){
  var url = req.body.url;
  var key = req.body.key;

google(key, function (err, res){
  if (err) ress.redirect('/check');
  // console.error(err)
  if(res.links.length == null)
  {
    ress.redirect('/check');
  }
  var link;
  var href;
  for (var i = 0; i < res.links.length; ++i) {
    link = res.links[i];
    href = link.href;
    if(href !== null)
    {      
      if( S(href).contains(url) == true)
      {
        session.rank = i+1;
        ress.render('checkkq', {noti: "Bạn đạt thứ hạng: " + session.rank, web: "Trang Website: "+ url, key: "Từ khóa: "+ key});
        return;
      }
    }
  }
   ress.render('checkkq', {noti: "Với từ khóa "+ key +" bạn chưa đạt thứ hạng!.", web: "Có thể do Website của bạn chưa đạt chuẩn SEO hoặc có thứ hạng dưới 100!..", key: " "});

  if (nextCounter < 4) {
    nextCounter += 1
    if (res.next) res.next()
  }
})
});

module.exports = app;

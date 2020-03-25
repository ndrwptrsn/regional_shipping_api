var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Regional Shipping API' });
});

router.post('/', function(req, res, next) {
  res.send('check whether the item is elligile');
});

module.exports = router;

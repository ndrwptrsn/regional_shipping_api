var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with all categories');
});

router.get('/:ebay_id', function(req, res, next) {
  res.send('respond with a category');
});

router.delete('/:ebay_id', function(req, res, next) {
  res.send('update a category');
});

router.post('/', function(req, res, next) {
  res.send('add a category');
});

module.exports = router;

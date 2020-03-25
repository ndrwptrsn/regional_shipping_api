var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with all rules');
});

router.get('/:id', function(req, res, next) {
  res.send('respond with a rule');
});

router.patch('/:id', function(req, res, next) {
  res.send('update a rule');
});

router.delete('/:id', function(req, res, next) {
  res.send('remove a rule');
});

router.post('/', function(req, res, next) {
  res.send('add a rule');
});

module.exports = router;

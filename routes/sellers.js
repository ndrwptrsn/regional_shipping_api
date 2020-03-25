var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with all sellers');
});

router.get('/:username', function(req, res, next) {
  res.send('respond with a seller');
});

router.post('/', function(req, res, next) {
  res.send('add a seller');
});

router.delete('/:id', function(req, res, next) {
  res.send('add a seller');
});

module.exports = router;

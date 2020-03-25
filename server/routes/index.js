const express = require('express');
const router = require('express').Router();
const apiRouter = require('express').Router();

// view api docs
apiRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Regional Shipping API' });
});

// check item eligibility
apiRouter.post('/', function(req, res, next) {
  res.send('check whether the item is elligile');
});

// load validators
const SellerValidator = require('../middleware/validators/SellerValidator');

// load controllers
const SellerController = require('../controllers/SellerController');

// seller routes
apiRouter.get('/sellers', SellerValidator.getSellers, SellerController.getSellers);
apiRouter.get('/sellers/:username', SellerValidator.getSeller, SellerController.getSeller);
apiRouter.post('/sellers', SellerValidator.addSeller, SellerController.addSeller);
apiRouter.delete('/sellers/:username', SellerValidator.removeSeller, SellerController.removeSeller);

// rule routes

// category routes


// add api router
router.use('/api', apiRouter);

module.exports = router;

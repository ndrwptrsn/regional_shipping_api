const express = require('express');
const router = require('express').Router();
const apiRouter = require('express').Router();
const models = require('../database/models');

// view api docs
apiRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Regional Shipping API' });
});

// check item eligibility - (/api/)
apiRouter.post('/', function(req, res, next) {





  res.send('check whether the item is elligile');
});

// load validators
const SellerValidator = require('../middleware/validators/SellerValidator');
const RuleValidator = require('../middleware/validators/RuleValidator');
const CategoryValidator = require('../middleware/validators/CategoryValidator');

// load controllers
const SellerController = require('../controllers/SellerController');
const RuleController = require('../controllers/RuleController');
const CategoryController = require('../controllers/CategoryController');

// rule routes
apiRouter.get('/rules', RuleValidator.getRules, RuleController.getRules);
apiRouter.get('/rules/:id', RuleValidator.getRule, RuleController.getRule);
apiRouter.delete('/rules/:id', RuleValidator.removeRule, RuleController.removeRule);
apiRouter.post('/rules', RuleValidator.addRule, RuleController.addRule);
apiRouter.patch('/rules/:id', RuleValidator.updateRule, RuleController.updateRule);

// seller routes
apiRouter.get('/sellers', SellerValidator.getSellers, SellerController.getSellers);
apiRouter.get('/sellers/:username', SellerValidator.getSeller, SellerController.getSeller);
apiRouter.post('/sellers', SellerValidator.addSeller, SellerController.addSeller);
apiRouter.delete('/sellers/:username', SellerValidator.removeSeller, SellerController.removeSeller);

// category routes
apiRouter.get('/categories', CategoryValidator.getCategories, CategoryController.getCategories);
apiRouter.get('/categories/:ebay_id', CategoryValidator.getCategory, CategoryController.getCategory);
apiRouter.delete('/categories/:ebay_id', CategoryValidator.removeCategory, CategoryController.removeCategory);
apiRouter.post('/categories', CategoryValidator.addCategory, CategoryController.addCategory);

// add api router
router.use('/api', apiRouter);

module.exports = router;

const _ = require('lodash');
const { body, param, query } = require('express-validator');
const { checkValidationErrors } = require('../');

const routesValidator = {
  checkEligibility: [
    body('price')
      .not().isEmpty().withMessage('required field \'price\' is missing')
      .custom((value) => {
        return !isNaN(value);
      }).withMessage('required field \'price\' must be an integer'),
    body('category')
      .not().isEmpty().withMessage('required field \'category\' is missing')
      .custom((value) => {
        return !isNaN(value);
      }).withMessage('required field \'category\' must be an integer'),
    body('title')
      .not().isEmpty().withMessage('required field \'title\' is missing')
      .isString().withMessage('required field \'title\' should be a string'),
    body('seller')
      .not().isEmpty().withMessage('required field \'seller\' is missing')
      .isString().withMessage('required field \'seller\' should be a string')
  ]
};

_.forEach(routesValidator, (routesValidator) => {
  routesValidator.push(checkValidationErrors);
});

module.exports = routesValidator;

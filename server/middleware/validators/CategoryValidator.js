const _ = require('lodash');
const { body, param, query } = require('express-validator');
const { checkValidationErrors } = require('../');

const routesValidator = {
  getCategories: [],
  getCategory: [],
  removeCategory: [],
  addCategory: [
    body('ebay_id')
      .not().isEmpty().withMessage('ebay_id field is missing')
      .custom((value) => {
        return !isNaN(value);
      }).withMessage('required field \'ebay_id\' must be an integer'),
  ]
};

_.forEach(routesValidator, (routesValidator) => {
  routesValidator.push(checkValidationErrors);
});

module.exports = routesValidator;

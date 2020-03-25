const _ = require('lodash');
const { body, param, query } = require('express-validator');
const { checkValidationErrors } = require('../AppMiddleware');

const available_operators = [
  '<',
  '>',
  '=',
  'between',
  'in'
];

const available_fields = [
    'price',
    'seller',
    'category',
    'date'
];

const routesValidator = {
  getRules: [],
  getRule: [],
  removeRule: [],
  addRule: [
    body('label')
      .not().isEmpty().withMessage('required field \'label\' is missing'),

    body('attribute')
      .not().isEmpty().withMessage('required field \'attribute\' is missing')
      .isString().withMessage('required field \'attribute\' should be a string')
      .custom((value) => {
        return _.includes(available_fields, value);
      }).withMessage('required field \'attribute\' must match an available fields: price, seller, category, date'),

    body('operator')
      .not().isEmpty().withMessage('required field \'operator\' is missing')
      .custom((value) => {
        return _.includes(available_operators, value);
      }).withMessage('required field \'operator\' must match an available operators: \'<\' \'>\' \'=\', \'between\', or \'in\''),

    body('comparator')
      .not().isEmpty().withMessage('required field \'comparator\' is missing')
      .custom((value) => {
        if (Array.isArray(value) && value.length < 3) {
          console.log(value);
          for (let i = 0; i <= value.length - 1; i++ ) {
            if (isNaN(value[i])) {
              return false;
            }
          }
          return true;
        }
        return false;
      }).withMessage('required field \'comparator\' must be either an array with 1-2 numerical values or an object with valid model and attribute fields'),
  ]
};

_.forEach(routesValidator, (routesValidator) => {
  routesValidator.push(checkValidationErrors);
});

module.exports = routesValidator;

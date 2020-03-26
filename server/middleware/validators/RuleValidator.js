const _ = require('lodash');
const { body, param, query } = require('express-validator');
const { checkValidationErrors } = require('../');
const models = require('../../database/models');
const modelArr = Object.keys(models);

const available_operators = [
  '<',
  '>',
  '<=',
  '>=',
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
      .not().isEmpty().withMessage('required field \'label\' is missing')
      .isString().withMessage('required field \'label\' should be a string'),

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

    body()
      .custom((req) => {
        let single_comparator_operators = ['=','>','<','>=','<='];
        if (Array.isArray(req.comparator) && _.includes(single_comparator_operators, req.operator)) {
          return req.comparator.length === 1;
        }
        if (Array.isArray(req.comparator) && req.operator == 'between') {
          return req.comparator.length === 2;
        }
        if (Array.isArray(req.comparator) && req.operator == 'in') {
          return false;
        }
        if (!Array.isArray(req.comparator) && req.operator == 'in') {
          return true;
        }
      }).withMessage('\'=\', \'>\', \'<\', \'>=\', \'<=\' operators can only have one numeric comparator, \'between\' operator must have exactly two numeric comparators, and \'in\' operator is for use with models only'),

    body('comparator')
      .not().isEmpty().withMessage('required field \'comparator\' is missing')
      .custom((value) => {
        if (Array.isArray(value) && value.length < 3) {
          for (let i = 0; i <= value.length - 1; i++ ) {
            if (isNaN(value[i])) {
              return false;
            }
          }
          return true;
        } else if (typeof(value) === 'object' && value.hasOwnProperty('model') && value.hasOwnProperty('attribute')) {
          let modelName = _.startCase(_.toLower(value.model));
          if (_.includes(modelArr, modelName)) {
            let model = Object.keys(models[modelName].attributes);
            if (_.includes(model, value.attribute)) {
              return true;
            }
          }
        }
        return false;
      }).withMessage('required field \'comparator\' must be either an array with 1-2 numerical values or an object with valid model and attribute fields'),
  ],

  updateRule: [
    body('label')
      .optional()
      .isString().withMessage('required field \'label\' should be a string'),

    body('attribute')
      .optional()
      .isString().withMessage('required field \'attribute\' should be a string')
      .custom((value) => {
        return _.includes(available_fields, value);
      }).withMessage('required field \'attribute\' must match an available fields: price, seller, category, date'),

    body('operator')
      .optional()
      .custom((value) => {
        return _.includes(available_operators, value);
      }).withMessage('required field \'operator\' must match an available operators: \'=\', \'<\', \'>\', \'<=\', \'>=\' \'between\', or \'in\''),

    body()
      .custom((req) => {
        let single_comparator_operators = ['=','>','<','>=','<='];
        if (Array.isArray(req.comparator) && _.includes(single_comparator_operators, req.operator)) {
          return req.comparator.length === 1;
        }
        if (Array.isArray(req.comparator) && req.operator == 'between') {
          return req.comparator.length === 2;
        }
        if (Array.isArray(req.comparator) && req.operator == 'in') {
          return false;
        }
        if (!Array.isArray(req.comparator) && req.operator == 'in') {
          return true;
        }
      }).withMessage('\'=\', \'>\', \'<\', \'>=\', \'<=\' operators can only have one comparator, \'between\' operator must have exactly two comparators, and \'in\' operator is for use with models only'),

    body('comparator')
      .optional()
      .custom((value) => {
        if (Array.isArray(value) && value.length < 3 && value.length > 0) {
          for (let i = 0; i <= value.length - 1; i++ ) {
            if (isNaN(value[i])) {
              return false;
            }
          }
          return true;
        } else if (typeof(value) === 'object' && value.hasOwnProperty('model') && value.hasOwnProperty('attribute')) {
          let modelName = _.startCase(_.toLower(value.model));
          if (_.includes(modelArr, modelName)) {
            let model = Object.keys(models[modelName].attributes);
            if (_.includes(model, value.attribute)) {
              return true;
            }
          }
        }
        return false;
      }).withMessage('required field \'comparator\' must be either an array with 1-2 numerical values or an object with valid model and attribute fields'),

  ]
};

_.forEach(routesValidator, (routesValidator) => {
  routesValidator.push(checkValidationErrors);
});

module.exports = routesValidator;

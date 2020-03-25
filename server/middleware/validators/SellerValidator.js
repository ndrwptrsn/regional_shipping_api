const _ = require('lodash');
const { body, param, query } = require('express-validator');
const { checkValidationErrors } = require('../AppMiddleware');

const routesValidator = {
  getSellers: [],
  getSeller: [],
  removeSeller: [],
  addSeller: [
    body('username')
      .not().isEmpty().withMessage('Username field is missing')
  ]
};

_.forEach(routesValidator, (routesValidator) => {
  routesValidator.push(checkValidationErrors);
});

module.exports = routesValidator;

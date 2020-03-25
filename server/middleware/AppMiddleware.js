const { validationResult } = require('express-validator');

exports.checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(422).json({ message: errors.array().map(error => error.msg)[0] });
}

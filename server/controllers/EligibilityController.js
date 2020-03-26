const _ = require('lodash');
const { Seller, Category, Rule } = require('../database/models');
const models = require('../database/models');
const { Op } = require('sequelize');
const Promise = require('bluebird');

exports.checkEligibility = async (req, res) => {
  const reqData = req.body;
  const rules = await Rule.findAll({});
  let ruleArr = rules.map((rule) => {
    return rule.dataValues;
  });

  let failArr = [];

  let invalidRules = false;

  let explanationArr = await Promise.mapSeries(ruleArr, async (rule) => {
    let reqAttributeValue = reqData[rule.target];

    // in
    if (!Array.isArray(rule.comparator)) {
      let ruleTarget = rule.target.toLowerCase();
      let ruleComparatorModel = rule.comparator.model.toLowerCase();
      if (ruleTarget !== ruleComparatorModel) {
        failArr.push(false);
        invalidRules = true;
        return 'rule ' + rule.id + ': invalid: rule.target ' + rule.target + ' does not match comparator model ' + rule.comparator.model;
      }
      let where = {};
      where[rule.comparator.attribute] = reqData[rule.target];
      let instance = await models[rule.comparator.model].findAll({
        where
      })
      if (instance.length > 0) {
        return 'rule ' + rule.id + ': passed';
      } else {
        failArr.push(false);
        return 'rule ' + rule.id + ': provided ' + rule.target + ' ' + reqAttributeValue + ' is not ' + rule.operator + ' model ' + rule.comparator.model + ' attribute ' + rule.comparator.attribute;
      }
    }

    // between
    if (Array.isArray(rule.comparator) && rule.comparator.length == 2) {
      rule.comparator.sort();
      // date or numerical
      if (rule.target == 'date') {
        let date = new Date().getTime();
        if (date > rule.comparator[0] && date < rule.comparator[1]) {
          return 'rule ' + rule.id + ': passed';
        } else {
          let date1 = new Date(parseInt(rule.comparator[0])).toISOString();
          let date2 = new Date(parseInt(rule.comparator[1])).toISOString();
          failArr.push(false);
          return 'rule ' + rule.id + ': today\'s ' + rule.target + ' ' + new Date(date).toISOString() + ' is not ' + rule.operator + ' ' + date1 + ' & ' + date2;
        }
      } else {
        if (reqAttributeValue > rule.comparator[0] && reqAttributeValue < rule.comparator[1]) {
          return 'rule ' + rule.id + ': passed';
        } else {
          failArr.push(false);
          return 'rule ' + rule.id + ': provided ' + rule.target + ' ' + reqAttributeValue + ' is not ' + rule.operator + ' ' + rule.comparator[0] + ' & ' + rule.comparator[1];
        }
      }
    }

    // arithmatic
    if (rule.comparator.length === 1) {
      let compare;
      switch (rule.operator) {
      case '>':
      compare = (a, b) => a > b;
        break;
      case '<':
      compare = (a, b) => a < b;
        break;
      case '>=':
      compare = (a, b) => a >= b;
        break;
      case '<=':
      compare = (a, b) => a <= b;
        break;
      case '=':
      compare = (a, b) => a = b;
        break;
      default:
        failArr.push(false);
        invalidRules = true;
        return 'Check rule ' + rule.id + ' validity'
      }
      if (compare(reqAttributeValue, rule.comparator[0])) {
        return 'rule ' + rule.id + ': passed';
      } else {
        failArr.push(false);
        return 'rule ' + rule.id + ': provided ' + rule.target + ' ' + reqAttributeValue + ' is not ' + rule.operator + ' ' + rule.comparator;
      }
    }
    failArr.push(false);
    invalidRules = true;
    return 'rule ' + rule.id + ': invalid: rule failed for unknown reason, check eligibility controller';
  })
  .catch((e) => {
    console.log(e);
  });

  let isEligible = (failArr.length === 0);

  if (invalidRules) {
    isEligible = 'invalid rules';
  }

  return res.status(200).json({
    eligible: isEligible,
    reason: explanationArr
  });

};

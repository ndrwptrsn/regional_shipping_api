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

  let passArr = await Promise.mapSeries(ruleArr, async (rule) => {
    let reqAttributeValue = reqData[rule.attribute];

    // in
    if (!Array.isArray(rule.comparator)) {
      let where = {};
      where[rule.comparator.attribute] = reqData[rule.attribute];
      let instance = await models[rule.comparator.model].findAll({
        where
      })
      if (instance.length > 0) {
        return(true);
      } else {
        return 'provided ' + rule.attribute + ' ' + reqAttributeValue + ' is not ' + rule.operator + ' model ' + rule.comparator.model + ' ' + rule.comparator.attribute;
      }
    }

    // between
    if (Array.isArray(rule.comparator) && rule.comparator.length == 2) {
      rule.comparator.sort();
      // date or numerical
      if (rule.attribute == 'date') {
        let date = new Date().getTime();
        if (date > rule.comparator[0] && date < rule.comparator[1]) {
          return true;
        } else {
          let date1 = new Date(parseInt(rule.comparator[0]));
          let date2 = new Date(parseInt(rule.comparator[1]));
          return 'today\'s ' + rule.attribute + ' ' + new Date(date) + ' is not ' + rule.operator + ' ' + date1 + ' & ' + date2;
        }
      } else {
        if (reqAttributeValue > rule.comparator[0] && reqAttributeValue < rule.comparator[1]) {
          return true;
        } else {
          return 'provided ' + rule.attribute + ' ' + reqAttributeValue + ' is not ' + rule.operator + ' ' + rule.comparator[0] + ' & ' + rule.comparator[1];
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
        return 'Check rule validity'
      }
      if (compare(reqAttributeValue, rule.comparator[0])) {
        return true;
      } else {
        return 'provided ' + rule.attribute + ' ' + reqAttributeValue + ' is not ' + rule.operator + ' ' + rule.comparator;
      }

    }

    return('e');
  })
  .catch((e) => {
    console.log(e);
  });

  console.log(passArr);

  // const categories = await Category.findAll({});
  return res.status(200).json('categories');

};

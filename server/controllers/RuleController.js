const _ = require('lodash');
const { Rule } = require('../database/models');
const { Op } = require('sequelize');

exports.getRules = async (req, res) => {
  const rules = await Rule.findAll({});
  return res.status(200).json(rules);
};

exports.getRule = async (req, res) => {
  const reqData = req.params;
  let id, label;
  isNaN(reqData.id) === false ? id = reqData.id : label = reqData.id;
  let rule = await Rule.findOne({
    where: {
      [Op.or]: {
        id: id,
        label: label
      }
    }
  });
  return res.status(200).json(rule || 'rule not found');
};


exports.removeRule = async (req, res) => {
  const reqData = req.params;
  let id, label;
  isNaN(reqData.id) === false ? id = reqData.id : label = reqData.id;
  let rule = await Rule.findOne({
    where: {
      [Op.or]: {
        id: id,
        label: label
      }
    }
  });
  if (rule) {
    await rule.destroy();
    return res.status(200).json('rule with id: ' + rule.id + ' and label: ' + rule.label + ' removed');
  } else {
    return res.status(200).json('rule not found');
  }
};

exports.addRule = async (req, res) => {
  const reqData = req.body;
  const {
    label,
    attribute,
    operator,
    comparator
  } = reqData;
  let rule = await Rule.findOne({
    where: {
      label: label
    }
  });
  if (rule) {
    return res.status(200).json('rule with label ' + rule.label + ' already added');
  } else {
    // rule = await Rule.create({
    //   label: label,
    //   attribute: attribute,
    //   operator: operator,
    //   comparator: comparator
    // });
    rule = 'he';
  }
  return res.status(201).json(rule);
};

const _ = require('lodash');
const { Category } = require('../database/models');
const { Op } = require('sequelize');

exports.getCategories = async (req, res) => {
  const categories = await Category.findAll({});
  return res.status(200).json(categories);
};

exports.getCategory = async (req, res) => {
  const reqData = req.params;
  const { ebay_id } = reqData;
  const category = await Category.findOne({
    where: {
      ebay_id: ebay_id
    }
  });
  let status;
  category ? status = 200 : status = 404;
  return res.status(status).json(category || 'category not found');
};

exports.addCategory = async (req, res) => {
  const reqData = req.body;
  const { ebay_id } = reqData;
  let category = await Category.findOne({
    where: {
      ebay_id: ebay_id
    }
  });
  if (category) {
    return res.status(200).json('category already added');
  } else {
    category = await Category.create({
      ebay_id: ebay_id
    });
  }
  return res.status(201).json(category);
};

exports.removeCategory = async (req, res) => {
  const reqData = req.params;
  const { ebay_id } = reqData;
  let category = await Category.findOne({
    where: {
      ebay_id: ebay_id
    }
  });
  if (category) {
    await category.destroy();
    return res.status(200).json('category ' + ebay_id + ' removed');
  } else {
    return res.status(404).json('category ' + ebay_id + ' not found');
  }
};

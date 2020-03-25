const _ = require('lodash');
const { Seller } = require('../database/models');
const { Op } = require('sequelize');

exports.getSellers = async (req, res) => {
  const sellers = await Seller.findAll({});
  return res.status(200).json(sellers);
};

exports.getSeller = async (req, res) => {
  const reqData = req.params;
  const { username } = reqData;
  const seller = await Seller.findOne({
    where: {
      username: username
    }
  });
  return res.status(200).json(seller || 'seller not found');
};

exports.addSeller = async (req, res) => {
  const reqData = req.body;
  const { username } = reqData;
  let seller = await Seller.findOne({
    where: {
      username: username
    }
  });
  if (seller) {
    return res.status(200).json('username already added');
  } else {
    seller = await Seller.create({
      username: username
    });
  }
  return res.status(201).json(seller);
};

exports.removeSeller = async (req, res) => {
  const reqData = req.body;
  const { username } = reqData;
  let seller = await Seller.findOne({
    where: {
      username: username
    }
  });
  if (seller) {
    await seller.destroy();
    return res.status(200).json('seller ' + username + ' removed');
  } else {
    return res.status(200).json('seller ' + username + ' not found');
  }
};

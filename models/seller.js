'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    name: DataTypes.STRING,
    eligible: DataTypes.BOOLEAN
  }, {});
  Seller.associate = function(models) {
    // associations can be defined here
  };
  return Seller;
};
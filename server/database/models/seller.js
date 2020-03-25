'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    username: DataTypes.STRING
  }, {});
  Seller.associate = function(models) {
    // associations can be defined here
  };
  return Seller;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define('Rule', {
    label: DataTypes.STRING,
    parameters: DataTypes.JSONB
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
  };
  return Rule;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define('Rule', {
    label: DataTypes.STRING,
    target: DataTypes.STRING,
    operator: DataTypes.STRING,
    comparator: DataTypes.JSONB
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
  };
  return Rule;
};

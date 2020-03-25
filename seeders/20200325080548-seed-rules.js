'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return Promise.all([
        queryInterface.bulkInsert('Rules', [{
          label: 'minimum_price',
          attribute: 'price',
          operator: '>',
          comparator: JSON.stringify([1000]),
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          label: 'active_season',
          attribute: 'createdAt',
          operator: 'between',
          comparator: JSON.stringify(['1591230018000', '1593822018000']),
          createdAt: new Date(),
          updatedAt: new Date()
        }], {})
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
      ])
    })
  }
};
